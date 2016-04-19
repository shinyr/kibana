import Promise from 'bluebird';
import moment from 'moment';
import testSubjSelector from '@spalger/test-subj-selector';
import fs from 'fs';
import _ from 'lodash';
import { red } from 'ansicolors';
import { parse, format } from 'url';
import { resolve } from 'path';

import { common, config, defaultTimeout, remote } from '../';
import getUrl from '../../utils/get_url';

function injectTimestampQuery(func, url) {
  var formatted = modifyQueryString(url, function (parsed) {
    parsed.query._t = Date.now();
  });
  return func.call(this, formatted);
}

function removeTimestampQuery(func) {
  return func.call(this)
  .then(url => modifyQueryString(url, parsed => {
    parsed.query = _.omit(parsed.query, '_t');
  }));
}

function modifyQueryString(url, func) {
  var parsed = parse(url, true);
  if (parsed.query === null) {
    parsed.query = {};
  }
  func(parsed);
  return format(_.pick(parsed, 'protocol', 'hostname', 'port', 'pathname', 'query', 'hash', 'auth'));
}

export class Common {
  getHostPort() {
    return getUrl.baseUrl(config.servers.kibana);
  }

  async navigateToApp(appName, testStatusPage = true) {
    const kbnUrlConfig = config.servers.kibana;
    const appUrlConfig = config.apps[appName];
    const navUrl = getUrl(kbnUrlConfig, appUrlConfig);
    const appUrl = getUrl.noAuth(kbnUrlConfig, appUrlConfig);

    const navigate = async () => {
      this.debug('navigating to', appName, 'with url:', navUrl);
      await remote.get(navUrl);

      this.debug('refreshing page to force re-render');
      await remote.refresh();
    };

    const testForStatusPage = async () => {
      this.debug('Checking for the staus page');
      if (!await this.checkForKibanaApp()) {
        this.debug('Kibana did not load, trying again');
        throw new Error(`Unable to navigate to ${appName}`);
      }
    };

    const confirmMatchingAppUrl = async () => {
      let currentUrl = await remote.getCurrentUrl();
      currentUrl = currentUrl.replace(/\/\/\w+:\w+@/, '//');

      var navSuccessful = new RegExp(appUrl).test(currentUrl);
      if (!navSuccessful) {
        throw new Error(
          `
            App failed to load: ${appName}
            appUrl = ${appUrl}
            and ended up at
            currentUrl = ${currentUrl}
          `.trim().replace(/\s+/g, '')
        );
      }
    };

    await this.try(async () => {
      await navigate();
      if (testStatusPage) await testForStatusPage();
      await confirmMatchingAppUrl();
      await this.waitForUrlToSettle();
    });
  }

  async waitForUrlToSettle(forTime = 500) {
    this.debug(`waiting for app url to not change for ${forTime}ms`);

    let prev = null;
    let current = null;
    do {
      if (prev) {
        this.debug(`app url changed from ${prev} to ${current}`);
        await this.sleep(forTime);
      }

      current = await remote.getCurrentUrl();
    } while (prev !== current);
  }

  async waitForDocumentReady(timeout = 10000) {
    await remote.withExecuteAsyncTimeout(timeout, async () => {
      await remote.executeAsync(`function (done) {
        var interval = setInterval(function () {
          var ready = (document.readyState === 'complete');
          var hasJQuery = !!window.$;

          if (ready && hasJQuery) {
            console.log('doc ready, jquery loaded');
            clearInterval(interval);
            done();
          }
        }, 10);
      }`);
    });
  }

  async runScript(fn, timeout) {
    await this.waitForDocumentReady(timeout);
    return await remote.execute(fn);
  }

  async getApp() {
    await remote.findByCssSelector('.app-wrapper .application');
    return await this.runScript(`function () {
      var $ = window.$;
      var $scope = $('.app-wrapper .application').scope();
      return $scope ? $scope.chrome.getApp() : {};
    }`);
  }

  async checkForKibanaApp() {
    try {
      const { id } = await this.getApp();
      this.debug(`current application: ${id}`);
      return id === 'kibana';
    } catch (err) {
      this.debug('kibana check failed');
      this.debug(err.stack);
      return false;
    }
  }

  async tryForTime(timeout, block) {
    await this.try(block, { timeout });
  }

  async try(block, opts = {}) {
    const { timeout = defaultTimeout, retryDelay = 100 } = opts;
    const start = Date.now();
    let lastErr;

    do {
      try {
        return await block();
      } catch (err) {
        lastErr = err;
        this.debug(`TryForTime failure: ${err.message}`);
        this.sleep(retryDelay);
      }
    } while (Date.now() - start < timeout);

    throw new Error(`TryForTime timeout after ${timeout} milliseconds. Last error: ${lastErr.message}`);
  }

  log(...messages) {
    console.log(`${moment().format('HH:mm:ss.SSS')}:`, ...messages);
  }

  logErr(...messages) {
    this.log(red('ERROR:'), ...messages);
  }

  debug(...messages) {
    if (config.debug) this.log(...messages);
  }

  async sleep(sleepMilliseconds) {
    this.debug(`... sleep start ... ${sleepMilliseconds}ms`);
    await Promise.delay(sleepMilliseconds);
    this.debug(`...  sleep end  ... ${sleepMilliseconds}ms`);
  }

  handleError(suite) {
    return (error) => {
      this.debug(`Test failure detected, taking screenshot.`);
      const testName = (function join(s) {
        return s.parent ? `${join(s.parent)}_${s.name}` : s.name;
      }(suite));

      const now = Date.now();
      const filename = `failure_${now}_${testName}.png`;
      const rethrow = () => { throw error; };
      return this.saveScreenshot(filename).then(rethrow, rethrow);
    };
  }

  async saveScreenshot(filename) {
    try {
      const filepath = resolve(__dirname, '../../output', filename);
      this.debug(`Taking screenshot`);
      const data = await remote.takeScreenshot();
      this.debug(`Saving screenshot to "${filepath}"`);
      fs.writeFileSync(filepath, data);
    } catch (err) {
      this.logErr(`Screenshot Failed: ${err.message}`);
      throw err;
    }
  }

  async findTestSubject(selector) {
    const cssSelector = testSubjSelector(selector);
    this.debug(`Finding test subject "${selector}" with css selector: "${cssSelector}"`);
    return await remote.findDisplayedByCssSelector(cssSelector);
  }
}
