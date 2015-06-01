'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(function (require) {
  return function DocTableHeaderProvider(Private) {
    var _ = require('lodash');
    var React = require('react');
    var shortDots = Private(require('filters/short_dots'));

    require('filters/short_dots');

    var PropTypes = React.PropTypes;
    var propTypes = {
      colNames: PropTypes.arrayOf(PropTypes.string).isRequired,
      sort: PropTypes.arrayOf(PropTypes.string).isRequired,
      indexPattern: PropTypes.object,

      actions: PropTypes.shape({
        changeSort: PropTypes.func.isRequired,
        removeCol: PropTypes.func.isRequired,
        moveColLeft: PropTypes.func.isRequired,
        moveColRight: PropTypes.func.isRequired
      }).isRequired
    };

    var DocTableHeader = (function (_React$Component) {
      function DocTableHeader() {
        _classCallCheck(this, DocTableHeader);

        if (_React$Component != null) {
          _React$Component.apply(this, arguments);
        }
      }

      _inherits(DocTableHeader, _React$Component);

      _createClass(DocTableHeader, [{
        key: 'getColumnSort',

        /*****
         * HELPERS
         *****/
        value: function getColumnSort(colName) {
          var sort = this.props.sort;

          return sort && sort[0] === colName ? sort[1] : null;
        }
      }, {
        key: 'getNextColumnSort',
        value: function getNextColumnSort(colName) {
          var indexPattern = this.props.indexPattern;

          var _ref = indexPattern.fields.byName[colName] || {};

          var sortable = _ref.sortable;

          if (!sortable) return null;

          switch (this.getColumnSort(colName)) {
            case 'asc':
              return 'desc';
            case 'desc':
              return null;
            default:
              return 'asc';
          }
        }
      }, {
        key: 'makeColHeading',

        /*****
         * ELEMENTS
         *****/
        value: function makeColHeading(colName, i) {
          if (!colName) return null;

          var controls = [this.makeColSortButton(colName)];

          if (i != null) {
            controls.push(this.makeColRemoveButton(colName, i), this.makeColMoveLeftButton(colName, i), this.makeColMoveRightButton(colName, i));
          }

          return React.createElement(
            'th',
            { key: colName },
            React.createElement(
              'span',
              { className: 'table-header-name' },
              shortDots(colName)
            ),
            React.createElement(
              'span',
              { className: 'table-header-controls' },
              controls
            )
          );
        }
      }, {
        key: 'makeColSortButton',
        value: function makeColSortButton(colName) {
          var actions = this.props.actions;

          var sort = this.getColumnSort(colName);
          var nextSort = this.getNextColumnSort(colName);

          if (sort === nextSort) return null;

          var nextSortDesc = nextSort === 'desc' ? 'Descending' : 'Ascending';
          return React.createElement('i', {
            key: 'sort',
            className: 'fa fa-sort' + (sort ? '-' + sort : '') + ' table-header-sortchange',
            onClick: function () {
              return actions.changeSort(colName, nextSort);
            },
            tooltip: 'Sort table by ' + shortDots(colName) + ' ' + nextSortDesc,
            'tooltip-append-to-body': '1' });
        }
      }, {
        key: 'makeColRemoveButton',
        value: function makeColRemoveButton(colName) {
          var _props = this.props;
          var actions = _props.actions;
          var colNames = _props.colNames;

          if (colName === '_source' && colNames.length === 1) {
            return null;
          }

          return React.createElement('i', {
            key: 'remove',
            onClick: function () {
              return actions.removeCol(colName);
            },
            className: 'fa fa-remove',
            tooltip: 'Remove column',
            'tooltip-append-to-body': '1' });
        }
      }, {
        key: 'makeColMoveLeftButton',
        value: function makeColMoveLeftButton(colName, i) {
          var actions = this.props.actions;

          if (i < 1) return null;

          return React.createElement('i', {
            key: 'move-left',
            onClick: function () {
              return actions.moveColLeft(colName);
            },
            className: 'fa fa-angle-double-left',
            tooltip: 'Move column to the left',
            'tooltip-append-to-body': '1' });
        }
      }, {
        key: 'makeColMoveRightButton',
        value: function makeColMoveRightButton(colName, i) {
          var _props2 = this.props;
          var actions = _props2.actions;
          var colNames = _props2.colNames;

          if (i > colNames.length - 1) return null;

          return React.createElement('i', {
            key: 'move-right',
            onClick: function () {
              return actions.moveColRight(colName);
            },
            className: 'fa fa-angle-double-right',
            tooltip: 'Move column to the right',
            'tooltip-append-to-body': '1' });
        }
      }, {
        key: 'render',
        value: function render() {
          var _props3 = this.props;
          var indexPattern = _props3.indexPattern;
          var colNames = _props3.colNames;

          return React.createElement(
            'tr',
            null,
            React.createElement('th', { style: { width: '1%' } }),
            this.makeColHeading(indexPattern.timeFieldName, null),
            colNames.map(this.makeColHeading, this)
          );
        }
      }], [{
        key: 'propTypes',
        get: function () {
          return propTypes;
        }
      }]);

      return DocTableHeader;
    })(React.Component);

    return DocTableHeader;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcGVuY2VyL2Rldi9lcy9raWJhbmEvc3JjL2tpYmFuYS9jb21wb25lbnRzL0RvY1RhYmxlL0RvY1RhYmxlSGVhZGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUN4QixTQUFPLFNBQVMsc0JBQXNCLENBQUMsT0FBTyxFQUFFO0FBQzlDLFFBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixRQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsUUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7O0FBRXZELFdBQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUU5QixRQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQ2hDLFFBQUksU0FBUyxHQUFHO0FBQ2QsY0FBUSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVU7QUFDeEQsVUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVU7QUFDcEQsa0JBQVksRUFBRSxTQUFTLENBQUMsTUFBTTs7QUFFOUIsYUFBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDdkIsa0JBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDckMsaUJBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDcEMsbUJBQVcsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDdEMsb0JBQVksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7T0FDeEMsQ0FBQyxDQUFDLFVBQVU7S0FDZCxDQUFDOztRQUVJLGNBQWM7ZUFBZCxjQUFjOzhCQUFkLGNBQWM7Ozs7Ozs7Z0JBQWQs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QUMsS0FBSyxFQUFFLElBQUksRUFBQyxBQUFDLEdBQU07WUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQztZQUNyRCxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDO1dBQ3RDLENBQ0w7U0FDSDs7O2FBcEhtQixZQUFHO0FBQUUsaUJBQU8sU0FBUyxDQUFBO1NBQUU7OzthQUZ2QyxjQUFjO09BQVMsS0FBSyxDQUFDLFNBQVM7O0FBeUg1QyxXQUFPLGNBQWMsQ0FBQztHQUN2QixDQUFDO0NBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9zcGVuY2VyL2Rldi9lcy9raWJhbmEvc3JjL2tpYmFuYS9jb21wb25lbnRzL0RvY1RhYmxlL0RvY1RhYmxlSGVhZGVyLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShmdW5jdGlvbiAocmVxdWlyZSkge1xuICByZXR1cm4gZnVuY3Rpb24gRG9jVGFibGVIZWFkZXJQcm92aWRlcihQcml2YXRlKSB7XG4gICAgdmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbiAgICB2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuICAgIHZhciBzaG9ydERvdHMgPSBQcml2YXRlKHJlcXVpcmUoJ2ZpbHRlcnMvc2hvcnRfZG90cycpKTtcblxuICAgIHJlcXVpcmUoJ2ZpbHRlcnMvc2hvcnRfZG90cycpO1xuXG4gICAgdmFyIFByb3BUeXBlcyA9IFJlYWN0LlByb3BUeXBlcztcbiAgICB2YXIgcHJvcFR5cGVzID0ge1xuICAgICAgY29sTmFtZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLmlzUmVxdWlyZWQsXG4gICAgICBzb3J0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKS5pc1JlcXVpcmVkLFxuICAgICAgaW5kZXhQYXR0ZXJuOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gICAgICBhY3Rpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBjaGFuZ2VTb3J0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICByZW1vdmVDb2w6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIG1vdmVDb2xMZWZ0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBtb3ZlQ29sUmlnaHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICB9O1xuXG4gICAgY2xhc3MgRG9jVGFibGVIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHsgcmV0dXJuIHByb3BUeXBlcyB9XG5cbiAgICAgIC8qKioqKlxuICAgICAgICogSEVMUEVSU1xuICAgICAgICoqKioqL1xuICAgICAgZ2V0Q29sdW1uU29ydChjb2xOYW1lKSB7XG4gICAgICAgIHZhciB7c29ydH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKHNvcnQgJiYgc29ydFswXSA9PT0gY29sTmFtZSkgPyBzb3J0WzFdIDogbnVsbDtcbiAgICAgIH1cblxuICAgICAgZ2V0TmV4dENvbHVtblNvcnQoY29sTmFtZSkge1xuICAgICAgICB2YXIge2luZGV4UGF0dGVybn0gPSB0aGlzLnByb3BzO1xuICAgICAgICB2YXIge3NvcnRhYmxlfSA9IGluZGV4UGF0dGVybi5maWVsZHMuYnlOYW1lW2NvbE5hbWVdIHx8IHt9O1xuXG4gICAgICAgIGlmICghc29ydGFibGUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRDb2x1bW5Tb3J0KGNvbE5hbWUpKSB7XG4gICAgICAgIGNhc2UgJ2FzYyc6XG4gICAgICAgICAgcmV0dXJuICdkZXNjJztcbiAgICAgICAgY2FzZSAnZGVzYyc6XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICdhc2MnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKioqKlxuICAgICAgICogRUxFTUVOVFNcbiAgICAgICAqKioqKi9cbiAgICAgIG1ha2VDb2xIZWFkaW5nKGNvbE5hbWUsIGkpIHtcbiAgICAgICAgaWYgKCFjb2xOYW1lKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgY29udHJvbHMgPSBbXG4gICAgICAgICAgdGhpcy5tYWtlQ29sU29ydEJ1dHRvbihjb2xOYW1lKVxuICAgICAgICBdO1xuXG4gICAgICAgIGlmIChpICE9IG51bGwpIHtcbiAgICAgICAgICBjb250cm9scy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5tYWtlQ29sUmVtb3ZlQnV0dG9uKGNvbE5hbWUsIGkpLFxuICAgICAgICAgICAgdGhpcy5tYWtlQ29sTW92ZUxlZnRCdXR0b24oY29sTmFtZSwgaSksXG4gICAgICAgICAgICB0aGlzLm1ha2VDb2xNb3ZlUmlnaHRCdXR0b24oY29sTmFtZSwgaSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDx0aCBrZXk9e2NvbE5hbWV9ID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RhYmxlLWhlYWRlci1uYW1lJz57IHNob3J0RG90cyhjb2xOYW1lKSB9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhYmxlLWhlYWRlci1jb250cm9sc1wiPnsgY29udHJvbHMgfTwvc3Bhbj5cbiAgICAgICAgPC90aD47XG4gICAgICB9XG5cbiAgICAgIG1ha2VDb2xTb3J0QnV0dG9uKGNvbE5hbWUpIHtcbiAgICAgICAgdmFyIHthY3Rpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHZhciBzb3J0ID0gdGhpcy5nZXRDb2x1bW5Tb3J0KGNvbE5hbWUpO1xuICAgICAgICB2YXIgbmV4dFNvcnQgPSB0aGlzLmdldE5leHRDb2x1bW5Tb3J0KGNvbE5hbWUpO1xuXG4gICAgICAgIGlmIChzb3J0ID09PSBuZXh0U29ydCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIG5leHRTb3J0RGVzYyA9IG5leHRTb3J0ID09PSAnZGVzYycgPyAnRGVzY2VuZGluZycgOiAnQXNjZW5kaW5nJztcbiAgICAgICAgcmV0dXJuIDxpXG4gICAgICAgICAga2V5PVwic29ydFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXsgYGZhIGZhLXNvcnQke3NvcnQgPyBgLSR7c29ydH1gIDogJyd9IHRhYmxlLWhlYWRlci1zb3J0Y2hhbmdlYCB9XG4gICAgICAgICAgb25DbGljaz17ICgpID0+IGFjdGlvbnMuY2hhbmdlU29ydChjb2xOYW1lLCBuZXh0U29ydCkgfVxuICAgICAgICAgIHRvb2x0aXA9eyBgU29ydCB0YWJsZSBieSAkeyBzaG9ydERvdHMoY29sTmFtZSkgfSAkeyBuZXh0U29ydERlc2MgfWAgfVxuICAgICAgICAgIHRvb2x0aXAtYXBwZW5kLXRvLWJvZHk9XCIxXCI+PC9pPlxuICAgICAgfVxuXG4gICAgICBtYWtlQ29sUmVtb3ZlQnV0dG9uKGNvbE5hbWUpIHtcbiAgICAgICAgdmFyIHthY3Rpb25zLCBjb2xOYW1lc30gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGlmIChjb2xOYW1lID09PSAnX3NvdXJjZScgJiYgY29sTmFtZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPGlcbiAgICAgICAgICBrZXk9XCJyZW1vdmVcIlxuICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBhY3Rpb25zLnJlbW92ZUNvbChjb2xOYW1lKSB9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmEgZmEtcmVtb3ZlXCJcbiAgICAgICAgICB0b29sdGlwPVwiUmVtb3ZlIGNvbHVtblwiXG4gICAgICAgICAgdG9vbHRpcC1hcHBlbmQtdG8tYm9keT1cIjFcIj48L2k+XG4gICAgICB9XG5cbiAgICAgIG1ha2VDb2xNb3ZlTGVmdEJ1dHRvbihjb2xOYW1lLCBpKSB7XG4gICAgICAgIHZhciB7YWN0aW9uc30gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGlmIChpIDwgMSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIDxpXG4gICAgICAgICAga2V5PVwibW92ZS1sZWZ0XCJcbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gYWN0aW9ucy5tb3ZlQ29sTGVmdChjb2xOYW1lKSB9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmEgZmEtYW5nbGUtZG91YmxlLWxlZnRcIlxuICAgICAgICAgIHRvb2x0aXA9XCJNb3ZlIGNvbHVtbiB0byB0aGUgbGVmdFwiXG4gICAgICAgICAgdG9vbHRpcC1hcHBlbmQtdG8tYm9keT1cIjFcIj48L2k+XG4gICAgICB9XG5cbiAgICAgIG1ha2VDb2xNb3ZlUmlnaHRCdXR0b24oY29sTmFtZSwgaSkge1xuICAgICAgICB2YXIge2FjdGlvbnMsIGNvbE5hbWVzfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKGkgPiBjb2xOYW1lcy5sZW5ndGggLSAxKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gPGlcbiAgICAgICAgICBrZXk9XCJtb3ZlLXJpZ2h0XCJcbiAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gYWN0aW9ucy5tb3ZlQ29sUmlnaHQoY29sTmFtZSkgfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImZhIGZhLWFuZ2xlLWRvdWJsZS1yaWdodFwiXG4gICAgICAgICAgdG9vbHRpcD1cIk1vdmUgY29sdW1uIHRvIHRoZSByaWdodFwiXG4gICAgICAgICAgdG9vbHRpcC1hcHBlbmQtdG8tYm9keT1cIjFcIj48L2k+XG4gICAgICB9XG5cbiAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHtpbmRleFBhdHRlcm4sIGNvbE5hbWVzfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoIHN0eWxlPXt7d2lkdGg6ICcxJSd9fT48L3RoPlxuICAgICAgICAgICAgeyB0aGlzLm1ha2VDb2xIZWFkaW5nKGluZGV4UGF0dGVybi50aW1lRmllbGROYW1lLCBudWxsKSB9XG4gICAgICAgICAgICB7IGNvbE5hbWVzLm1hcCh0aGlzLm1ha2VDb2xIZWFkaW5nLCB0aGlzKSB9XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRG9jVGFibGVIZWFkZXI7XG4gIH07XG59KTtcbiJdfQ==