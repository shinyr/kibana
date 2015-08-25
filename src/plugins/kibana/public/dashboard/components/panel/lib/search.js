define(function (require) {
  return function searchLoaderProvider(Private) { // Inject services here
    let { searches: savedSearches } = Private(require('ui/registry/saved_object_types')).byId;

    return function loadSearchPanel(panel, $scope) { // Function parameters here
      return savedSearches.get(panel.id)
      .then(function (savedSearch) {
        panel.columns = panel.columns || savedSearch.columns;
        panel.sort = panel.sort || savedSearch.sort;

        $scope.$watchCollection('panel.columns', function () {
          $scope.state.save();
        });

        $scope.$watchCollection('panel.sort', function () {
          $scope.state.save();
        });

        return {
          savedObj: savedSearch,
          panel: panel,
          editUrl: savedSearches.urlFor(panel.id)
        };
      });
    };

  };
});
