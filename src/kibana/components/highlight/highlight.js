define(function (require) {
  return function highlightProvider(Private) {
    var _ = require('lodash');
    var angular = require('angular');
    var highlightTags = Private(require('highlight/highlight_tags'));

    return function highlightFilter(formatted, highlight) {
      if (typeof formatted === 'object') formatted = angular.toJson(formatted);

      _.each(highlight, function (section) {
        section = _.escape(section);

        // Strip out the highlight tags to compare against the formatted string
        var untagged = section
          .split(highlightTags.pre).join('')
          .split(highlightTags.post).join('');

        // Replace all highlight tags with proper html tags
        var tagged = section
          .split(highlightTags.pre).join('<mark>')
          .split(highlightTags.post).join('</mark>');

        // Replace all instances of the untagged string with the properly tagged string
        formatted = formatted.split(untagged).join(tagged);
      });

      return formatted;
    };
  };
});
