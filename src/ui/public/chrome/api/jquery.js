import $ from 'jquery';

export default function (chrome, internals) {
  $.ajaxPrefilter(function (options, defaults, jqXhr) {
    jqXhr.setRequestHeader('kibana-csrf', 'true');
  });
}
