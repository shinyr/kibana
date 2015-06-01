define(function (require) {
  require('field_format_editor/pattern/pattern');

  require('modules')
  .get('kibana')
  .directive('fieldEditorNumeral', function () {
    return {
      restrict: 'E',
      template: require('field_format_editor/numeral/numeral.html')
    };
  });
});
