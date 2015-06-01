define(function (require) {
  return function DocTableRowProvider(Private) {

    // guesstimate at the minimum number of chars wide cells in the table should be
    const MIN_LINE_LENGTH = 20;
    var React = require('react');
    var addWordBreaks = require('utils/add_word_breaks');

    var DocTableToggle = Private(require('components/DocTable/DocTableToggle'));

    class DocTableRow extends React.Component {
      getValue(column, breakWords) {
        var {row, indexPattern} = this.props;
        var val = indexPattern.formatField(row, column);

        if (!breakWords) return val;

        val = addWordBreaks(val, MIN_LINE_LENGTH);
        if (val.length <= MIN_LINE_LENGTH) return val;

        return <div class="truncate-by-height">
          {val}
        </div>;

      }

      render() {
        var {row, indexPattern, columns} = this.props;

        var cells = [
          <DocTableToggle key='toggle' { ...this.props } />
        ];

        if (indexPattern.timeFieldName) {
          cells.push(
            <td
              key='$$timefield'
              className='discover-table-timefield'
              style='width: 1%'>
              { this.getValue(indexPattern.timeFieldName) }
            </td>
          );
        }

        columns.forEach(function (column) {
          cells.push(
            <td key={column}>{ this.getValue(column, true) }</td>
          );
        });

        return <tr>{cells}</tr>
      }
    }

    return DocTableRow;
  }
});
