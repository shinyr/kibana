define(function (require) {
  return function DocTableToggleProvider() {
    var React = require('react');
    var classNames = require('classNames');

    class DocTableToggle extends React.Component {
      render() {
        var {open, row, actions} = this.props;

        return (
          <td key='toggle' onClick={() => actions.toggleRow(row)}>
            <i
              className={classNames('fa discover-table-open-icon', {
                'fa-caret-down': open,
                'fa-caret-right': !open
              })}>
            </i>
          </td>
        );
      }
    }

  }
});
