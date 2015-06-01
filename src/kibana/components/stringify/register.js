define(function (require) {
  var fieldFormats = require('registry/field_formats');
  fieldFormats.register(require('stringify/types/Url'));
  fieldFormats.register(require('stringify/types/Bytes'));
  fieldFormats.register(require('stringify/types/Date'));
  fieldFormats.register(require('stringify/types/Ip'));
  fieldFormats.register(require('stringify/types/Number'));
  fieldFormats.register(require('stringify/types/Percent'));
  fieldFormats.register(require('stringify/types/String'));
  fieldFormats.register(require('stringify/types/Source'));
});
