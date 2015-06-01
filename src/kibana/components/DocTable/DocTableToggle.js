'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(function (require) {
  return function DocTableToggleProvider() {
    var React = require('react');
    var classNames = require('classNames');

    var DocTableToggle = (function (_React$Component) {
      function DocTableToggle() {
        _classCallCheck(this, DocTableToggle);

        if (_React$Component != null) {
          _React$Component.apply(this, arguments);
        }
      }

      _inherits(DocTableToggle, _React$Component);

      _createClass(DocTableToggle, [{
        key: 'render',
        value: function render() {
          var _props = this.props;
          var open = _props.open;
          var row = _props.row;
          var actions = _props.actions;

          return React.createElement(
            'td',
            { key: 'toggle', onClick: function () {
                return actions.toggleRow(row);
              } },
            React.createElement('i', {
              className: classNames('fa discover-table-open-icon', {
                'fa-caret-down': open,
                'fa-caret-right': !open
              }) })
          );
        }
      }]);

      return DocTableToggle;
    })(React.Component);
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcGVuY2VyL2Rldi9lcy9raWJhbmEvc3JjL2tpYmFuYS9jb21wb25lbnRzL0RvY1RhYmxlL0RvY1RhYmxlVG9nZ2xlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUN4QixTQUFPLFNBQVMsc0JBQXNCLEdBQUc7QUFDdkMsUUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLFFBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFFakMsY0FBYztlQUFkLGNBQWM7OEJBQWQsY0FBYzs7Ozs7OztnQkFBZCxjQUFjOzttQkFBZCxjQUFjOztlQUNaLGtCQUFHO3VCQUNvQixJQUFJLENBQUMsS0FBSztjQUFoQyxJQUFJLFVBQUosSUFBSTtjQUFFLEdBQUcsVUFBSCxHQUFHO2NBQUUsT0FBTyxVQUFQLE9BQU87O0FBRXZCLGlCQUNFOztjQUFJLEdBQUcsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFFO3VCQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2VBQUEsQUFBQztZQUNyRDtBQUNFLHVCQUFTLEVBQUUsVUFBVSxDQUFDLDZCQUE2QixFQUFFO0FBQ25ELCtCQUFlLEVBQUUsSUFBSTtBQUNyQixnQ0FBZ0IsRUFBRSxDQUFDLElBQUk7ZUFDeEIsQ0FBQyxBQUFDLEdBQ0Q7V0FDRCxDQUNMO1NBQ0g7OzthQWRHLGNBQWM7T0FBUyxLQUFLLENBQUMsU0FBUztHQWlCN0MsQ0FBQTtDQUNGLENBQUMsQ0FBQyIsImZpbGUiOiIvVXNlcnMvc3BlbmNlci9kZXYvZXMva2liYW5hL3NyYy9raWJhbmEvY29tcG9uZW50cy9Eb2NUYWJsZS9Eb2NUYWJsZVRvZ2dsZS5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIERvY1RhYmxlVG9nZ2xlUHJvdmlkZXIoKSB7XG4gICAgdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbiAgICB2YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzTmFtZXMnKTtcblxuICAgIGNsYXNzIERvY1RhYmxlVG9nZ2xlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHtvcGVuLCByb3csIGFjdGlvbnN9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDx0ZCBrZXk9J3RvZ2dsZScgb25DbGljaz17KCkgPT4gYWN0aW9ucy50b2dnbGVSb3cocm93KX0+XG4gICAgICAgICAgICA8aVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2ZhIGRpc2NvdmVyLXRhYmxlLW9wZW4taWNvbicsIHtcbiAgICAgICAgICAgICAgICAnZmEtY2FyZXQtZG93bic6IG9wZW4sXG4gICAgICAgICAgICAgICAgJ2ZhLWNhcmV0LXJpZ2h0JzogIW9wZW5cbiAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgPC9pPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbn0pO1xuIl19