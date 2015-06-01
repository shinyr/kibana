'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(function (require) {
  return function DocTableDetailsProvider(Private) {
    var kbnUrl = Private(require('components/url/url'));
    var React = require('react');

    var DocTableDetails = (function (_React$Component) {
      function DocTableDetails() {
        _classCallCheck(this, DocTableDetails);

        if (_React$Component != null) {
          _React$Component.apply(this, arguments);
        }
      }

      _inherits(DocTableDetails, _React$Component);

      _createClass(DocTableDetails, [{
        key: 'render',
        value: function render() {
          var _props = this.props;
          var indexPattern = _props.indexPattern;
          var row = _props.row;
          var columns = _props.columns;

          var href = kbnUrl.eval('#/doc/{{indexId}}/{{index}}/{{type}}/?id={{id}}', {
            indexId: indexPattern.id,
            index: row._index,
            type: row._type,
            id: row._id
          });

          React.createElement(
            'td',
            { colspan: columns.length + 2 },
            React.createElement(
              'a',
              {
                className: 'pull-right',
                href: href },
              React.createElement(
                'small',
                null,
                'Link to /',
                row._index,
                '/',
                row._type,
                '/',
                row._id
              )
            ),
            React.createElement(
              'p',
              null,
              'doc viewer goes here'
            )
          );
        }
      }]);

      return DocTableDetails;
    })(React.Component);
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcGVuY2VyL2Rldi9lcy9raWJhbmEvc3JjL2tpYmFuYS9jb21wb25lbnRzL0RvY1RhYmxlL0RvY1RhYmxlRGV0YWlscy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDeEIsU0FBTyxTQUFTLHVCQUF1QixDQUFDLE9BQU8sRUFBRTtBQUMvQyxRQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztBQUNwRCxRQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBRXZCLGVBQWU7ZUFBZixlQUFlOzhCQUFmLGVBQWU7Ozs7Ozs7Z0JBQWYsZUFBZTs7bUJBQWYsZUFBZTs7ZUFDYixrQkFBRzt1QkFDNEIsSUFBSSxDQUFDLEtBQUs7Y0FBeEMsWUFBWSxVQUFaLFlBQVk7Y0FBRSxHQUFHLFVBQUgsR0FBRztjQUFFLE9BQU8sVUFBUCxPQUFPOztBQUUvQixjQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxvREFBb0Q7QUFDeEUsbUJBQU8sRUFBRSxZQUFZLENBQUMsRUFBRTtBQUN4QixpQkFBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNO0FBQ2pCLGdCQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUs7QUFDZixjQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUc7V0FDWixDQUFDLENBQUM7O0FBRUg7O2NBQUksT0FBTyxFQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxBQUFFO1lBQ2hDOzs7QUFDRSx5QkFBUyxFQUFDLFlBQVk7QUFDdEIsb0JBQUksRUFBRyxJQUFJLEFBQUU7Y0FDYjs7OztnQkFBaUIsR0FBRyxDQUFDLE1BQU07O2dCQUFHLEdBQUcsQ0FBQyxLQUFLOztnQkFBRyxHQUFHLENBQUMsR0FBRztlQUFTO2FBQ3hEO1lBQ0o7Ozs7YUFBMkI7V0FDeEIsQ0FBQTtTQUNOOzs7YUFuQkcsZUFBZTtPQUFTLEtBQUssQ0FBQyxTQUFTO0dBc0I5QyxDQUFDO0NBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9zcGVuY2VyL2Rldi9lcy9raWJhbmEvc3JjL2tpYmFuYS9jb21wb25lbnRzL0RvY1RhYmxlL0RvY1RhYmxlRGV0YWlscy5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIERvY1RhYmxlRGV0YWlsc1Byb3ZpZGVyKFByaXZhdGUpIHtcbiAgICB2YXIga2JuVXJsID0gUHJpdmF0ZShyZXF1aXJlKCdjb21wb25lbnRzL3VybC91cmwnKSk7XG4gICAgdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuICAgIGNsYXNzIERvY1RhYmxlRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciB7aW5kZXhQYXR0ZXJuLCByb3csIGNvbHVtbnN9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICB2YXIgaHJlZiA9IGtiblVybC5ldmFsKGAjL2RvYy97e2luZGV4SWR9fS97e2luZGV4fX0ve3t0eXBlfX0vP2lkPXt7aWR9fWAsIHtcbiAgICAgICAgICBpbmRleElkOiBpbmRleFBhdHRlcm4uaWQsXG4gICAgICAgICAgaW5kZXg6IHJvdy5faW5kZXgsXG4gICAgICAgICAgdHlwZTogcm93Ll90eXBlLFxuICAgICAgICAgIGlkOiByb3cuX2lkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIDx0ZCBjb2xzcGFuPXsgY29sdW1ucy5sZW5ndGggKyAyIH0+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT0ncHVsbC1yaWdodCdcbiAgICAgICAgICAgIGhyZWY9eyBocmVmIH0+XG4gICAgICAgICAgICA8c21hbGw+TGluayB0byAve3Jvdy5faW5kZXh9L3tyb3cuX3R5cGV9L3tyb3cuX2lkfTwvc21hbGw+XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxwPmRvYyB2aWV3ZXIgZ29lcyBoZXJlPC9wPlxuICAgICAgICA8L3RkPlxuICAgICAgfVxuICAgIH1cblxuICB9O1xufSk7XG4iXX0=