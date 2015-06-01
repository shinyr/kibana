var webpack = require('webpack');
var {join, dirname} = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DirnameAsIndex = require('./DirnameAsIndex');

var ROOT = join(__dirname, '..');
var SRC = join(ROOT, 'src', 'kibana');
var OUT = join(ROOT, 'src', 'server', 'public');

var pluginEntries = require('glob').sync('./plugins/*/index.js', { cwd: SRC });

module.exports = {
  context: SRC,

  // webpack options
  entry: {
    app: pluginEntries.concat(['./index.js']),
    vendor: [
      'lodash',
      'jquery',
      'angular'
    ]
  },

  output: {
    path: OUT,
    filename: '[name].js'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.(jpg|png|gif|svg|woff|woff2|eot|ttf)($|\?)/,
        loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]'
      },

      {
        test: /\.(html|tmpl)$/,
        loader: 'raw'
      },

      {
        test: /\.jsx$/,
        include: [ SRC ],
        loader: 'babel'
      },

      {
        test: /\.css$/,
        loader: 'style!css'
      },

      { test: /\/angular\.js/, loader: 'exports?window.angular' },

    ],
    noParse: [
      /elasticsearch-browser/
    ]
  },

  resolve: {
    root: SRC,
    modulesDirectories: ['components', 'node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      file_saver: '@spalger/filesaver',
      gridster: '@spalger/gridster',
      lesshat: 'lesshat/build/lesshat.less',
      elasticsearch: 'elasticsearch-browser/elasticsearch.angular.js'
    }
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'KIBANA_PLUGINS': JSON.stringify(pluginEntries),
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),

    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    }),

    new webpack.ResolverPlugin([
      new DirnameAsIndex()
    ]),

    new webpack.IgnorePlugin(/\.(less|txt|ico|map)$/),

    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity
    })
  ]
};
