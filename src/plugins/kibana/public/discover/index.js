define(function (require, module, exports) {
  require('plugins/kibana/discover/directives/timechart');
  require('ui/collapsible_sidebar');
  require('plugins/kibana/discover/components/field_chooser/field_chooser');
  require('plugins/kibana/discover/controllers/discover');
  require('plugins/kibana/discover/styles/main.less');

  // preload
  require('ui/doc_table/components/table_row');

  require('ui/registry/saved_object_types').register(require('./savedSearches'));

});
