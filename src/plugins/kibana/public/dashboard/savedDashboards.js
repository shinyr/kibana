define(function (require) {
  return function SavedDashboardsProvider(Private, Promise, kbnIndex, es, kbnUrl) {
    var _ = require('lodash');

    var SavedDashboard = Private(require('./SavedDashboard'));

    this.id = 'dashboards';
    this.type = SavedDashboard.type;
    this.Class = SavedDashboard;

    this.loaderProperties = {
      name: this.id,
      noun: 'Dashboard',
      nouns: 'dashboards'
    };

    // Returns a single dashboard by ID, should be the name of the dashboard
    this.get = function (id) {

      // Returns a promise that contains a dashboard which is a subclass of docSource
      return (new SavedDashboard(id)).init();
    };

    this.urlFor = function (id) {
      return kbnUrl.eval('#/dashboard/{{id}}', {id: id});
    };

    this.delete = function (ids) {
      ids = !_.isArray(ids) ? [ids] : ids;
      return Promise.map(ids, function (id) {
        return (new SavedDashboard(id)).delete();
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
        type: 'dashboard',
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
