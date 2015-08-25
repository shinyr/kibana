define(function (require) {
  return function SavedSearchesProvider(Private, Promise, kbnIndex, es, kbnUrl) {
    var _ = require('lodash');

    var Notifier = require('ui/notify/Notifier');
    var SavedSearch = Private(require('./SavedSearch'));

    var notify = new Notifier({
      location: 'Saved Searches'
    });

    this.id = 'searches';
    this.type = SavedSearch.type;
    this.Class = SavedSearch;

    this.loaderProperties = {
      name: this.id,
      noun: 'Saved Search',
      nouns: 'saved searches'
    };

    this.get = function (id) {
      return (new SavedSearch(id)).init();
    };

    this.urlFor = function (id) {
      return kbnUrl.eval('#/discover/{{id}}', {id: id});
    };

    this.delete = function (ids) {
      ids = !_.isArray(ids) ? [ids] : ids;
      return Promise.map(ids, function (id) {
        return (new SavedSearch(id)).delete();
      });
    };

    this.find = function (searchString) {
      var self = this;
      var body;
      if (searchString) {
        body = {
          query: {
            simple_query_string: {
              query: searchString + '*',
              fields: ['title^3', 'description'],
              default_operator: 'AND'
            }
          }
        };
      } else {
        body = { query: {match_all: {}}};
      }

      return es.search({
        index: kbnIndex,
        type: 'search',
        body: body,
        size: 100
      })
      .then(function (resp) {
        return {
          total: resp.hits.total,
          hits: resp.hits.hits.map(function (hit) {
            var source = hit._source;
            source.id = hit._id;
            source.url = self.urlFor(hit._id);
            return source;
          })
        };
      });
    };
  };
});
