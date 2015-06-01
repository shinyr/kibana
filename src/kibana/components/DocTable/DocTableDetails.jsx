define(function (require) {
  return function DocTableDetailsProvider(Private) {
    var kbnUrl = Private(require('components/url/url'));
    var React = require('react');

    class DocTableDetails extends React.Component {
      render() {
        var {indexPattern, row, columns} = this.props;

        var href = kbnUrl.eval(`#/doc/{{indexId}}/{{index}}/{{type}}/?id={{id}}`, {
          indexId: indexPattern.id,
          index: row._index,
          type: row._type,
          id: row._id
        });

        <td colspan={ columns.length + 2 }>
          <a
            className='pull-right'
            href={ href }>
            <small>Link to /{row._index}/{row._type}/{row._id}</small>
          </a>
          <p>doc viewer goes here</p>
        </td>
      }
    }

  };
});
