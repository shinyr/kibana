define(function (require) {
  return function NormalizeChartDataFactory(Private) {
    return {
      hierarchical: Private(require('agg_response/hierarchical/build_hierarchical_data')),
      pointSeries: Private(require('agg_response/point_series/point_series')),
      tabify: Private(require('agg_response/tabify/tabify')),
      geoJson: Private(require('agg_response/geo_json/geo_json'))
    };
  };
});