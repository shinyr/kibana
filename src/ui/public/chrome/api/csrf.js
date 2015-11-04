import $ from 'jquery';
import { set } from 'lodash';
import decode from 'jwt-decode';
import Notify from 'ui/notify/Notifier';

const notify = new Notify();

export default function (chrome, internals) {
  let token = null;
  let pendingCbs = null;
  const csrfHeader = chrome.getInjected('csrfHeader');

  const fetchNewToken = notify.timed('fetching new CSRF token', function () {
    pendingCbs = [];

    const xhr = $.post('/api/token');

    xhr
    .done(function () {
      const cbs = pendingCbs;
      pendingCbs = null;
      token = xhr.getResponseHeader(csrfHeader);

      const { exp } = decode(token);
      const expiresIn = (new Date(exp * 1000)) - Date.now();

      // refresh the token 60 seconds
      // before it expires
      const refreshIn = expiresIn - 60000;
      notify.log(`scheduling token refresh for ${(refreshIn / 1000).toFixed(2)} seconds`);
      setTimeout(() => {
        notify.log('clearing token before it expires');
        token = null;
      }, refreshIn);

      cbs.forEach(cb => cb(null, token));
    })
    .fail(function (xhr, status, err) {
      const cbs = pendingCbs;
      pendingCbs = null;
      cbs.forEach(cb => cb(err));
    });

    return xhr;
  });

  chrome.getCsrfToken = function (cb) {
    if (token) return cb(null, token);
    if (!pendingCbs) fetchNewToken();
    return pendingCbs.push(cb);
  };

  chrome.$httpRequestInterceptorProvider = function (Promise) {
    return {
      request: function (config) {
        return Promise
        .fromNode(cb => chrome.getCsrfToken(cb))
        .then((token) => {
          set(config, ['headers', csrfHeader], token);
          return config;
        });
      }
    };
  };
};
