'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(function (require) {
  return function DocTableRowProvider(Private) {

    // guesstimate at the minimum number of chars wide cells in the table should be
    var MIN_LINE_LENGTH = 20;
    var React = require('react');
    var addWordBreaks = require('utils/add_word_breaks');

    var DocTableToggle = Private(require('components/DocTable/DocTableToggle'));

    var DocTableRow = (function (_React$Component) {
      function DocTableRow() {
        _classCallCheck(this, DocTableRow);

        if (_React$Component != null) {
          _React$Component.apply(this, arguments);
        }
      }

      _inherits(DocTableRow, _React$Component);

      _createClass(DocTableRow, [{
        key: 'getValue',
        value: function getValue(column, breakWords) {
          var _props = this.props;
          var row = _props.row;
          var indexPattern = _props.indexPattern;

          var val = indexPattern.formatField(row, column);

          if (!breakWords) return val;

          val = addWordBreaks(val, MIN_LINE_LENGTH);
          if (val.length <= MIN_LINE_LENGTH) return val;

          return React.createElement(
            'div',
            { 'class': 'truncate-by-height' },
            val
          );
        }
      }, {
        key: 'render',
        value: function render() {
          var _props2 = this.props;
          var row = _props2.row;
          var indexPattern = _props2.indexPattern;
          var columns = _props2.columns;

          var cells = [React.createElement(DocTableToggle, _extends({ key: 'toggle' }, this.props))];

          if (indexPattern.timeFieldName) {
            cells.push(React.createElement(
              'td',
              {
                key: '$$timefield',
                className: 'discover-table-timefield',
                style: 'width: 1%' },
              this.getValue(indexPattern.timeFieldName)
            ));
          }

          columns.forEach(function (column) {
            cells.push(React.createElement(
              'td',
              { key: column },
              this.getValue(column, true)
            ));
          });

          return React.createElement(
            'tr',
            null,
            cells
          );
        }
      }]);

      return DocTableRow;
    })(React.Component);

    return DocTableRow;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcGVuY2VyL2Rldi9lcy9raWJhbmEvc3JjL2tpYmFuYS9jb21wb25lbnRzL0RvY1RhYmxlL0RvY1RhYmxlUm93LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxDQUFDLFVBQVUsT0FBTyxFQUFFO0FBQ3hCLFNBQU8sU0FBUyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7OztBQUczQyxRQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDM0IsUUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLFFBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUVyRCxRQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQzs7UUFFdEUsV0FBVztlQUFYLFdBQVc7OEJBQVgsV0FBVzs7Ozs7OztnQkFBWCxXQUFXOzttQkFBWCxXQUFXOztlQUNQLGtCQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUU7dUJBQ0QsSUFBSSxDQUFDLEtBQUs7Y0FBL0IsR0FBRyxVQUFILEdBQUc7Y0FBRSxZQUFZLFVBQVosWUFBWTs7QUFDdEIsY0FBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRWhELGNBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxHQUFHLENBQUM7O0FBRTVCLGFBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzFDLGNBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxlQUFlLEVBQUUsT0FBTyxHQUFHLENBQUM7O0FBRTlDLGlCQUFPOztjQUFLLFNBQU0sb0JBQW9CO1lBQ25DLEdBQUc7V0FDQSxDQUFDO1NBRVI7OztlQUVLLGtCQUFHO3dCQUM0QixJQUFJLENBQUMsS0FBSztjQUF4QyxHQUFHLFdBQUgsR0FBRztjQUFFLFlBQVksV0FBWixZQUFZO2NBQUUsT0FBTyxXQUFQLE9BQU87O0FBRS9CLGNBQUksS0FBSyxHQUFHLENBQ1Ysb0JBQUMsY0FBYyxhQUFDLEdBQUcsRUFBQyxRQUFRLElBQU0sSUFBSSxDQUFDLEtBQUssRUFBSyxDQUNsRCxDQUFDOztBQUVGLGNBQUksWUFBWSxDQUFDLGFBQWEsRUFBRTtBQUM5QixpQkFBSyxDQUFDLElBQUksQ0FDUjs7O0FBQ0UsbUJBQUcsRUFBQyxhQUFhO0FBQ2pCLHlCQUFTLEVBQUMsMEJBQTBCO0FBQ3BDLHFCQUFLLEVBQUMsV0FBVztjQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzthQUN4QyxDQUNOLENBQUM7V0FDSDs7QUFFRCxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUNoQyxpQkFBSyxDQUFDLElBQUksQ0FDUjs7Z0JBQUksR0FBRyxFQUFFLE1BQU0sQUFBQztjQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUFPLENBQ3RELENBQUM7V0FDSCxDQUFDLENBQUM7O0FBRUgsaUJBQU87OztZQUFLLEtBQUs7V0FBTSxDQUFBO1NBQ3hCOzs7YUF6Q0csV0FBVztPQUFTLEtBQUssQ0FBQyxTQUFTOztBQTRDekMsV0FBTyxXQUFXLENBQUM7R0FDcEIsQ0FBQTtDQUNGLENBQUMsQ0FBQyIsImZpbGUiOiIvVXNlcnMvc3BlbmNlci9kZXYvZXMva2liYW5hL3NyYy9raWJhbmEvY29tcG9uZW50cy9Eb2NUYWJsZS9Eb2NUYWJsZVJvdy5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIERvY1RhYmxlUm93UHJvdmlkZXIoUHJpdmF0ZSkge1xuXG4gICAgLy8gZ3Vlc3N0aW1hdGUgYXQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGNoYXJzIHdpZGUgY2VsbHMgaW4gdGhlIHRhYmxlIHNob3VsZCBiZVxuICAgIGNvbnN0IE1JTl9MSU5FX0xFTkdUSCA9IDIwO1xuICAgIHZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG4gICAgdmFyIGFkZFdvcmRCcmVha3MgPSByZXF1aXJlKCd1dGlscy9hZGRfd29yZF9icmVha3MnKTtcblxuICAgIHZhciBEb2NUYWJsZVRvZ2dsZSA9IFByaXZhdGUocmVxdWlyZSgnY29tcG9uZW50cy9Eb2NUYWJsZS9Eb2NUYWJsZVRvZ2dsZScpKTtcblxuICAgIGNsYXNzIERvY1RhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAgIGdldFZhbHVlKGNvbHVtbiwgYnJlYWtXb3Jkcykge1xuICAgICAgICB2YXIge3JvdywgaW5kZXhQYXR0ZXJufSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHZhciB2YWwgPSBpbmRleFBhdHRlcm4uZm9ybWF0RmllbGQocm93LCBjb2x1bW4pO1xuXG4gICAgICAgIGlmICghYnJlYWtXb3JkcykgcmV0dXJuIHZhbDtcblxuICAgICAgICB2YWwgPSBhZGRXb3JkQnJlYWtzKHZhbCwgTUlOX0xJTkVfTEVOR1RIKTtcbiAgICAgICAgaWYgKHZhbC5sZW5ndGggPD0gTUlOX0xJTkVfTEVOR1RIKSByZXR1cm4gdmFsO1xuXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzPVwidHJ1bmNhdGUtYnktaGVpZ2h0XCI+XG4gICAgICAgICAge3ZhbH1cbiAgICAgICAgPC9kaXY+O1xuXG4gICAgICB9XG5cbiAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHtyb3csIGluZGV4UGF0dGVybiwgY29sdW1uc30gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHZhciBjZWxscyA9IFtcbiAgICAgICAgICA8RG9jVGFibGVUb2dnbGUga2V5PSd0b2dnbGUnIHsgLi4udGhpcy5wcm9wcyB9IC8+XG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKGluZGV4UGF0dGVybi50aW1lRmllbGROYW1lKSB7XG4gICAgICAgICAgY2VsbHMucHVzaChcbiAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICBrZXk9JyQkdGltZWZpZWxkJ1xuICAgICAgICAgICAgICBjbGFzc05hbWU9J2Rpc2NvdmVyLXRhYmxlLXRpbWVmaWVsZCdcbiAgICAgICAgICAgICAgc3R5bGU9J3dpZHRoOiAxJSc+XG4gICAgICAgICAgICAgIHsgdGhpcy5nZXRWYWx1ZShpbmRleFBhdHRlcm4udGltZUZpZWxkTmFtZSkgfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb2x1bW4pIHtcbiAgICAgICAgICBjZWxscy5wdXNoKFxuICAgICAgICAgICAgPHRkIGtleT17Y29sdW1ufT57IHRoaXMuZ2V0VmFsdWUoY29sdW1uLCB0cnVlKSB9PC90ZD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gPHRyPntjZWxsc308L3RyPlxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBEb2NUYWJsZVJvdztcbiAgfVxufSk7XG4iXX0=