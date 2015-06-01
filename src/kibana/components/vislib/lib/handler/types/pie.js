define(function (require) {
  return function PieHandler(d3, Private) {
    var Handler = Private(require('vislib/lib/handler/handler'));
    var Data = Private(require('vislib/lib/data'));
    var Legend = Private(require('vislib/lib/legend'));
    var ChartTitle = Private(require('vislib/lib/chart_title'));

    /*
     * Handler for Pie visualizations.
     */

    return function (vis) {
      var data = new Data(vis.data, vis._attr);

      return new Handler(vis, {
        legend: new Legend(vis, vis.el, data.pieNames(), data.getPieColorFunc(), vis._attr),
        chartTitle: new ChartTitle(vis.el)
      });
    };
  };
});
