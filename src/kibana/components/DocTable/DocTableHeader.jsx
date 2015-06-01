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

    class DocTableHeader extends React.Component {

      static get propTypes() { return propTypes }

      /*****
       * HELPERS
       *****/
      getColumnSort(colName) {
        var {sort} = this.props;
        return (sort && sort[0] === colName) ? sort[1] : null;
      }

      getNextColumnSort(colName) {
        var {indexPattern} = this.props;
        var {sortable} = indexPattern.fields.byName[colName] || {};

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

      /*****
       * ELEMENTS
       *****/
      makeColHeading(colName, i) {
        if (!colName) return null;

        var controls = [
          this.makeColSortButton(colName)
        ];

        if (i != null) {
          controls.push(
            this.makeColRemoveButton(colName, i),
            this.makeColMoveLeftButton(colName, i),
            this.makeColMoveRightButton(colName, i)
          );
        }

        return <th key={colName} >
          <span className='table-header-name'>{ shortDots(colName) }</span>
          <span className="table-header-controls">{ controls }</span>
        </th>;
      }

      makeColSortButton(colName) {
        var {actions} = this.props;
        var sort = this.getColumnSort(colName);
        var nextSort = this.getNextColumnSort(colName);

        if (sort === nextSort) return null;

        var nextSortDesc = nextSort === 'desc' ? 'Descending' : 'Ascending';
        return <i
          key="sort"
          className={ `fa fa-sort${sort ? `-${sort}` : ''} table-header-sortchange` }
          onClick={ () => actions.changeSort(colName, nextSort) }
          tooltip={ `Sort table by ${ shortDots(colName) } ${ nextSortDesc }` }
          tooltip-append-to-body="1"></i>
      }

      makeColRemoveButton(colName) {
        var {actions, colNames} = this.props;

        if (colName === '_source' && colNames.length === 1) {
          return null;
        }

        return <i
          key="remove"
          onClick={ () => actions.removeCol(colName) }
          className="fa fa-remove"
          tooltip="Remove column"
          tooltip-append-to-body="1"></i>
      }

      makeColMoveLeftButton(colName, i) {
        var {actions} = this.props;

        if (i < 1) return null;

        return <i
          key="move-left"
          onClick={ () => actions.moveColLeft(colName) }
          className="fa fa-angle-double-left"
          tooltip="Move column to the left"
          tooltip-append-to-body="1"></i>
      }

      makeColMoveRightButton(colName, i) {
        var {actions, colNames} = this.props;

        if (i > colNames.length - 1) return null;

        return <i
          key="move-right"
          onClick={ () => actions.moveColRight(colName) }
          className="fa fa-angle-double-right"
          tooltip="Move column to the right"
          tooltip-append-to-body="1"></i>
      }

      render() {
        var {indexPattern, colNames} = this.props;
        return (
          <tr>
            <th style={{width: '1%'}}></th>
            { this.makeColHeading(indexPattern.timeFieldName, null) }
            { colNames.map(this.makeColHeading, this) }
          </tr>
        );
      }
    }

    return DocTableHeader;
  };
});
