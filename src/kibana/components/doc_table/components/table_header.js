define(function (require) {
  require('modules')
  .get('app/discover')
  .directive('kbnTableHeader', function (Private) {

    var _ = require('lodash');
    var React = require('react');
    var TableHeader = Private(require('DocTable/DocTableHeader'));

    return {
      restrict: 'A',

      scope: {
        colNames: '=columns',
        sort: '=sorting',
        indexPattern: '=',
      },

      link: function ($scope, $el) {

        var actions = {
          removeCol: function (fieldName) {
            _.toggleInOut($scope.colNames, fieldName);
          },

          moveColLeft: function (colName) {
            var index = _.indexOf($scope.colNames, colName);
            if (index === 0) return;
            _.move($scope.colNames, index, --index);
          },

          moveColRight: function (colName) {
            var index = _.indexOf($scope.colNames, colName);
            if (index === $scope.colNames.length - 1) return;
            _.move($scope.colNames, index, ++index);
          },

          changeSort: function (colName, dir) {
            $scope.$apply(function () {

              if (!dir && $scope.indexPattern.timeFieldName) {
                colName = $scope.indexPattern.timeFieldName;
                dir = 'asc';
              }

              $scope.sort[0] = colName;
              $scope.sort[1] = dir;
            });
          },
        };

        $scope.$watchMulti([
          '[]colNames',
          '[]sort',
          'indexPattern'
        ], function () {

          var header = React.createElement(TableHeader, {
            colNames: $scope.colNames,
            sort: $scope.sort,
            indexPattern: $scope.indexPattern,
            actions: actions
          });

          React.render(header, $el.get(0));
        });
      }
    };
  });
});
