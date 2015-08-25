define(function (require) {
  return function SavedVisualizationsProvider(Promise, es, kbnIndex, Private, Notifier, kbnUrl) {
    var _ = require('lodash');

    var SavedVis = Private(require('./SavedVis'));
    var visTypes = Private(require('ui/registry/vis_types'));
    var notify = new Notifier({
      location: 'Saved Visualization Service'
    });

    this.id = 'visualizations';
    this.type = SavedVis.type;
    this.Class = SavedVis;

    this.loaderProperties = {
      name: this.id,
      noun: 'Visualization',
      nouns: 'visualizations'
    };

    this.get = function (id) {
      return (new SavedVis(id)).init();
    };

    this.urlFor = function (id) {
      return kbnUrl.eval('#/visualize/edit/{{id}}', {id: id});
    };

    this.delete = function (ids) {
      ids = !_.isArray(ids) ? [ids] : ids;
      return Promise.map(ids, function (id) {
        return (new SavedVis(id)).delete();
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
        type: 'visualization',
        body: body,
        size: 100,
      })
      .then(function (resp) {
        return {
          total: resp.hits.total,
          hits: _.transform(resp.hits.hits, function (hits, hit) {
            var source = hit._source;
            source.id = hit._id;
            source.url = self.urlFor(hit._id);

            var typeName = source.typeName;
            if (source.visState) {
              try { typeName = JSON.parse(source.visState).type; }
              catch (e) { /* missing typename handled below */ } // eslint-disable-line no-empty
            }

            if (!typeName || !visTypes.byName[typeName]) {
              if (!typeName) notify.error('Visualization type is missing. Please add a type to this visualization.', hit);
              else notify.error('Visualization type of "' + typeName + '" is invalid. Please change to a valid type.', hit);
              return kbnUrl.redirect('/settings/objects/savedVisualizations/{{id}}', {id: source.id});
            }

            source.type = visTypes.byName[typeName];
            source.icon = source.type.icon;
            hits.push(source);
          }, [])
        };
      });
    };
  };
});
