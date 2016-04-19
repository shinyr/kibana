import { remote, common, defaultTimeout } from '../';
import Bluebird from 'bluebird';

export class DiscoverPage {
  getQueryField() {
    return remote.findByCssSelector('input[ng-model=\'state.query\']');
  }

  getQuerySearchButton() {
    return remote.findByCssSelector('button[aria-label=\'Search\']');
  }

  getTimespanText() {
    return remote
    .findByCssSelector('.kibana-nav-options .navbar-timepicker-time-desc pretty-duration')
    .getVisibleText();
  }

  getChartTimespan() {
    return remote
    .findByCssSelector('center.small > span:nth-child(1)')
    .getVisibleText();
  }

  saveSearch(searchName) {
    return this.clickSaveSearchButton()
    .then(function () {
      common.debug('--saveSearch button clicked');
      return remote.findDisplayedById('SaveSearch')
      .pressKeys(searchName);
    })
    .then(function clickSave() {
      common.debug('--find save button');
      return common.findTestSubject('discover-save-search-btn').click();
    })
    .catch(common.handleError(this));
  }

  loadSavedSearch(searchName) {
    var self = this;
    return self.clickLoadSavedSearchButton()
    .then(function () {
      return remote.findByLinkText(searchName).click();
    });
  }

  clickNewSearchButton() {
    return remote
    .findByCssSelector('button[aria-label="New Search"]')
    .click();
  }

  clickSaveSearchButton() {
    return remote
    .findByCssSelector('button[aria-label="Save Search"]')
    .click();
  }

  clickLoadSavedSearchButton() {
    return remote
    .findDisplayedByCssSelector('button[aria-label="Load Saved Search"]')
    .click();
  }

  getCurrentQueryName() {
    return remote
    .findByCssSelector('span.kibana-nav-info-title span')
    .getVisibleText();
  }

  getBarChartData() {
    return remote
    .findAllByCssSelector('rect[data-label="Count"]')
    .then((chartData) =>
      Bluebird.map(chartData, chart =>
        chart.getAttribute('height')
      )
    );
  }

  getChartInterval() {
    return remote
    .findByCssSelector('a[ng-click="toggleInterval()"]')
    .getVisibleText();
  }

  setChartInterval(interval) {
    return remote.withFindTimeout(5000, () => {
      return remote
      .findByCssSelector('a[ng-click="toggleInterval()"]')
      .click()
      .catch(function () {
        // in some cases we have the link above, but after we've made a
        // selection we just have a select list.
      })
      .then(function () {
        return remote
        .findByCssSelector('option[label="' + interval + '"]')
        .click();
      });
    });
  }

  getHitCount() {
    return remote
    .findByCssSelector('strong.discover-info-hits')
    .getVisibleText();
  }

  query(queryString) {
    return remote
    .findByCssSelector('input[aria-label="Search input"]')
    .clearValue()
    .type(queryString)
    .then(function () {
      return remote
      .findByCssSelector('button[aria-label="Search"]')
      .click();
    });
  }

  getDocHeader() {
    return remote
    .findByCssSelector('thead.ng-isolate-scope > tr:nth-child(1)')
    .getVisibleText();
  }

  getDocTableIndex(index) {
    return remote
    .findByCssSelector('tr.discover-table-row:nth-child(' + (index) + ')')
    .getVisibleText();
  }

  clickDocSortDown() {
    return remote
    .findByCssSelector('.fa-sort-down')
    .click();
  }

  clickDocSortUp() {
    return remote
    .findByCssSelector('.fa-sort-up')
    .click();
  }

  getMarks() {
    return remote
    .findAllByCssSelector('mark')
    .getVisibleText();
  }

  clickShare() {
    return remote
    .findByCssSelector('button[aria-label="Share Search"]')
    .click();
  }

  clickShortenUrl() {
    return remote
    .findByCssSelector('button.shorten-button')
    .click();
  }

  clickCopyToClipboard() {
    return remote
    .findDisplayedByCssSelector('button.clipboard-button')
    .click();
  }

  getShareCaption() {
    return remote
    .findByCssSelector('.vis-share label')
    .getVisibleText();
  }

  getSharedUrl() {
    return remote
    .findByCssSelector('.url')
    .getProperty('value');
  }

  getShortenedUrl() {
    return remote
    .findByCssSelector('.url')
    .getProperty('value');
  }

  toggleSidebarCollapse() {
    return remote.findDisplayedByCssSelector('.sidebar-collapser .chevron-cont')
      .click();
  }

  getSidebarWidth() {
    return remote
      .findByClassName('sidebar-list')
      .getProperty('clientWidth');
  }
};
