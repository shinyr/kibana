define(function (require) {
  var _ = require('lodash');
  var typeahead = require('modules').get('kibana/typeahead');
  var listTemplate = require('typeahead/partials/typeahead-items.html');

  require('notify/directives');

  typeahead.directive('kbnTypeaheadItems', function () {
    return {
      restrict: 'E',
      require: '^kbnTypeahead',
      replace: true,
      template: listTemplate,

      link: function ($scope, $el, attr, typeaheadCtrl) {
        $scope.typeahead = typeaheadCtrl;
      }
    };
  });
});
