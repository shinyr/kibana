define(function (require) {
  return function visualizationLoaderProvider(Private) {
    var brushEvent = Private(require('ui/utils/brush_event'));
    let { visualizations: savedVisualizations } = Private(require('ui/registry/saved_object_types')).byId;
    var filterBarClickHandler = Private(require('ui/filter_bar/filter_bar_click_handler'));

    return function loadVisualization(panel, $scope) { // Function parameters here
      return savedVisualizations.get(panel.id)
      .then(function (savedVis) {
        // $scope.state comes via $scope inheritence from the dashboard app. Don't love this.
        savedVis.vis.listeners.click = filterBarClickHandler($scope.state);
        savedVis.vis.listeners.brush = brushEvent;

        return {
          savedObj: savedVis,
          panel: panel,
          editUrl: savedVisualizations.urlFor(panel.id)
        };
      });
    };
  };
});
