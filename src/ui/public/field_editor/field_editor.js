define(function (require) {

  require('ui/field_format_editor');
  require('angular-bootstrap-colorpicker');
  require('angular-bootstrap-colorpicker/css/colorpicker.css');

  require('ui/modules')
  .get('kibana', ['colorpicker.module'])
  .directive('fieldEditor', function (Private, $sce) {
    var _ = require('lodash');
    var fieldFormats = Private(require('ui/registry/field_formats'));
    var Field = Private(require('ui/index_patterns/_field'));
    var scriptingInfo = $sce.trustAsHtml(require('ui/field_editor/scripting_info.html'));
    var scriptingWarning = $sce.trustAsHtml(require('ui/field_editor/scripting_warning.html'));

    return {
      restrict: 'E',
      template: require('ui/field_editor/field_editor.html'),
      scope: {
        getIndexPattern: '&indexPattern',
        getField: '&field'
      },
      controllerAs: 'editor',
      controller: function ($scope, Notifier, kbnUrl) {
        var self = this;
        var notify = new Notifier({ location: 'Field Editor' });

        self.scriptingInfo = scriptingInfo;
        self.scriptingWarning = scriptingWarning;

        self.indexPattern = $scope.getIndexPattern();
        self.field = shadowCopy($scope.getField());
        self.formatParams = self.field.format.params();

        // only init on first create
        self.creating = !self.indexPattern.fields.byName[self.field.name];
        self.selectedFormatId = _.get(self.field, ['$$spec', 'format', 'id']);
        self.defFormatType = initDefaultFormat();
        self.fieldFormatTypes = [self.defFormatType].concat(fieldFormats.byFieldType[self.field.type] || []);

        self.cancel = redirectAway;
        self.save = function () {
          var indexPattern = self.indexPattern;
          var fields = indexPattern.fields;
          var field = self.field.toActualField();

          fields.remove({ name: field.name });
          fields.push(field);

          return indexPattern.save()
          .then(function () {
            notify.info('Saved Field "' + self.field.name + '"');
            redirectAway();
          });
        };

        self.delete = function () {
          var indexPattern = self.indexPattern;
          var field = self.field;

          indexPattern.fields.remove({ name: field.name });
          return indexPattern.save()
          .then(function () {
            notify.info('Deleted Field "' + field.name + '"');
            redirectAway();
          });
        };

        $scope.$watchMulti([
          'editor.selectedFormatId',
          '=editor.formatParams'
        ], function (cur, prev) {
          var formatIdChanged = cur[0] !== prev[0];

          var selectedFormatId = self.selectedFormatId;
          var unknownFormat = !fieldFormats.byId[selectedFormatId];
          var defaultIsSelected = !selectedFormatId;
          var FieldFormat = getFieldFormatType();

          // when default is selected leave format empty
          if (defaultIsSelected) {
            self.field.format = null;
            return;
          }

          // if we don't know what format this is, allow saving without multilating the format params
          if (unknownFormat) return;

          if (formatIdChanged) {
            // the format was changed, clear out the formatParams and rebuild field format
            self.formatParams = _.assign({}, _.cloneDeep(FieldFormat.paramDefaults));
            self.field.format = new FieldFormat(self.formatParams);
            return;
          }

          // params changed, or we are initializing, either way rebuild the field format
          self.field.format = new FieldFormat(self.formatParams);
        });

        // copy the defined properties of the field to a plain object
        // which is mutable, and capture the changed seperately.
        function shadowCopy(field) {
          var changes = {};
          var shadowProps = {
            toActualField: {
              // bring the shadow copy out of the shadows
              value: function toActualField() {
                var spec = _.mapValues(_.defaults({}, changes, field.$$spec), function (value) {
                  return value == null ? undefined : value;
                });
                return new Field(self.indexPattern, spec);
              }
            }
          };

          Object.getOwnPropertyNames(field).forEach(function (prop) {
            var desc = Object.getOwnPropertyDescriptor(field, prop);
            shadowProps[prop] = {
              enumerable: desc.enumerable,
              get: function () {
                return _.has(changes, prop) ? changes[prop] : field[prop];
              },
              set: function (v) {
                changes[prop] = v;
              }
            };
          });

          return Object.create(null, shadowProps);
        }

        function redirectAway() {
          kbnUrl.changeToRoute(self.indexPattern, self.field.scripted ? 'scriptedFields' : 'indexedFields');
        }

        function getFieldFormatType() {
          if (self.selectedFormatId) return fieldFormats.getType(self.selectedFormatId);
          else return fieldFormats.getDefaultType(self.field.type);
        }

        function initDefaultFormat() {
          var def = Object.create(fieldFormats.getDefaultType(self.field.type));

          // explicitly set to undefined to prevent inheritting the prototypes id
          def.id = undefined;
          def.resolvedTitle = def.title;
          def.title = '- default - ';

          return def;
        }
      }
    };
  });

});
