import { set } from 'lodash';

const csrfTokenKey = 'KibanaCSRFToken';
const localStorage = window.localStorage;

export default function (chrome, internals) {

  localStorage.setItem(csrfTokenKey, internals.csrfToken);
  internals.csrfToken = null;

  chrome.getCsrfToken = function () {
    return localStorage.getItem(csrfTokenKey);
  };

  chrome.$csrfTokenTransform = function (opts) {
    set(opts, ['headers', 'X-CSRF-TOKEN'], chrome.getCsrfToken());
  };
};
