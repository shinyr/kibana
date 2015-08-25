define(function (require) {
  require('plugins/kibana/settings/sections/objects/_view');
  require('plugins/kibana/settings/sections/objects/_objects');

  require('ace');
  require('ui/directives/confirm_click');

  return {
    name: 'objects',
    display: 'Objects',
    url: '#/settings/objects'
  };
});
