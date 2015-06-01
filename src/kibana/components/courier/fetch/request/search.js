define(function (require) {
  return function SearchReqProvider(Private) {
    var _ = require('lodash');

    var searchStrategy = Private(require('courier/fetch/strategy/search'));
    var AbstractRequest = Private(require('courier/fetch/request/request'));

    _(SearchReq).inherits(AbstractRequest);
    var Super = SearchReq.Super;
    function SearchReq(source, defer) {
      Super.call(this, source, defer);

      this.type = 'search';
      this.strategy = searchStrategy;
    }

    return SearchReq;
  };
});