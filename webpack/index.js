require('babel/register');

var webpack = require('webpack');
var compiler = webpack(require('./config.js'));

var watcher = compiler.watch({
  aggregateTimeout: 300,
  poll: true
}, function (err, stats) {
  console.log(err || stats.toString({ color: true }));
});
