define(function (require) {
  /**
   * kbnTableRow directive
   *
   * Display a row in the table
   * ```
   * <tr ng-repeat="row in rows" kbn-table-row="row"></tr>
   * ```
   */
  require('modules')
  .get('app/discover')
  .directive('kbnTableRows', function (Private) {
    var _ = require('lodash');
    var $ = require('jquery');
    var DocTableRow = Private(require('components/DocTable/DocTableRow'));
    var DocTableDetails = Private(require('components/DocTableDetails/DocTableDetails'));
    var React = require('react');

    return {
      restrict: 'E',
      scope: {
        columns: '=',
        filter: '=',
        indexPattern: '=',
        rows: '=rows'
      },
      link: function ($scope, $el) {
        var el = $el.get(0);
        var openRows = [];

        var actions = {
          toggleRow(row) {
            $scope.$apply(function () {
              _.toggleInOut($scope.rows, row);
            });
          }
        }

        $scope.$watchMulti([
          '[]rows',
          '[]columns',
          'indexPattern',
        ], function () {
          var {rows, columns, indexPattern} = $scope;

          if (!rows || !columns || !indexPattern) {
            React.unmountComponentAtNode(el);
            return;
          }

          var tableRows = [];
          var wasOpen = openRows.slice(0);
          $scope.rows.forEach(function (row) {
            var open = (alreadyOpen.length > _.pull(alreadyOpen, row));

            rows.push(
              <DocTableRow
                row={row}
                open={open}
                columns={columns}
                indexPattern={indexPattern}
                actions={actions}/>,

              open && <DocTableDetails
                row={row}
                open={open}
                columns={columns}
                indexPattern={indexPattern}
                actions={actions}/>
            );
          });

          React.render(<tbody>{tableRows}</tbody>, el);
        });
      }
    };
  });
});
