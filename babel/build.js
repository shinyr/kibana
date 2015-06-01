var {join} = require('path');
var {Gaze} = require('gaze');
var {Builder} = require('./Builder');

var cwd = join(__dirname, '..', 'src', 'kibana', 'components');
var gaze = new Gaze([
  '**/*.jsx',
], { cwd });

// Files have all started watching
gaze.on('ready', function (watcher) {
  var builder = new Builder(cwd, watcher);
  builder.init().done();
});

