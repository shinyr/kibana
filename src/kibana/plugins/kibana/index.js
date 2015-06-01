define(function (require) {
  // base angular components/directives we expect to be loaded
  require('angular-bootstrap');
  require('services/private');
  require('config/config');
  require('courier/courier');
  require('filter_bar/filter_bar');
  require('notify/notify');
  require('persisted_log/persisted_log');
  require('state_management/app_state');
  require('state_management/global_state');
  require('storage/storage');
  require('url/url');
  require('doc_title/doc_title');
  require('tooltip/tooltip');
  require('style_compile/style_compile');
  require('watch_multi');
  require('bind');
  require('listen');
  require('fancy_forms/fancy_forms');
  require('stringify/register');
  require('directives/click_focus');
  require('directives/info');
  require('directives/spinner');
  require('directives/paginate');
  require('directives/pretty_duration');
  require('directives/rows');

  var Notifier = require('notify/_notifier');

  // ensure that the kibana module requires ui.bootstrap
  require('modules')
  .get('kibana', ['ui.bootstrap'])
  .config(function ($tooltipProvider) {
    $tooltipProvider.setTriggers({ 'mouseenter': 'mouseleave click' });
  })
  .directive('kibana', function (Private, $rootScope, $injector, Promise, config, kbnSetup) {
    return {
      template: require('plugins/kibana/kibana.html'),
      controllerAs: 'kibana',
      controller: function ($scope) {
        var _ = require('lodash');
        var self = $rootScope.kibana = this;
        var notify = new Notifier({ location: 'Kibana' });

        // this is the only way to handle uncaught route.resolve errors
        $rootScope.$on('$routeChangeError', function (event, next, prev, err) {
          notify.fatal(err);
        });

        // run init functions before loading the mixins, so that we can ensure that
        // the environment is ready for them to get and use their dependencies
        self.ready = Promise.all([ kbnSetup(), config.init() ])
        .then(function () {
          // load some "mixins"
          var mixinLocals = { $scope: $scope, notify: notify };
          $injector.invoke(require('plugins/kibana/_init'), self, mixinLocals);
          $injector.invoke(require('plugins/kibana/_apps'), self, mixinLocals);
          $injector.invoke(require('plugins/kibana/_timepicker'), self, mixinLocals);

          $scope.setupComplete = true;
        });
      }
    };
  });
});
