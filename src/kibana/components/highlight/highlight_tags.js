define(function (require) {
  // By default, ElasticSearch surrounds matched values in <em></em>. This is not ideal because it is possible that
  // the value could contain <em></em> in the value. We define these custom tags that we would never expect to see
  // inside a field value.
  return function highlightTagsProvider() {
    return {
      pre: '@kibana-highlighted-field@',
      post: '@/kibana-highlighted-field@'
    };
  };
});
