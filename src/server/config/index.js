var _ = require('lodash');
var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var configPath = process.env.CONFIG_PATH || path.join(__dirname, 'kibana.yml');
var kibana = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
var env = process.env.NODE_ENV || 'development';

function checkPath(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

// Set defaults for config file stuff
kibana.port = kibana.port || 5601;
kibana.host = kibana.host || '0.0.0.0';
kibana.elasticsearch_url = kibana.elasticsearch_url || 'http://localhost:9200';
kibana.maxSockets = kibana.maxSockets || Infinity;
kibana.log_file = kibana.log_file || null;

kibana.request_timeout = kibana.startup_timeout == null ? 0 : kibana.request_timeout;
kibana.ping_timeout = kibana.ping_timeout == null ? kibana.request_timeout : kibana.ping_timeout;
kibana.startup_timeout = kibana.startup_timeout == null ? 5000 : kibana.startup_timeout;

// Check to see if htpasswd file exists in the root directory otherwise set it to false
var htpasswdPath = path.resolve(__dirname, '..', '.htpasswd');
if (!checkPath(htpasswdPath)) htpasswdPath = path.resolve(__dirname, '..', '..', '..', '.htpasswd');
if (!checkPath(htpasswdPath)) htpasswdPath = false;

var packagePath = path.resolve(__dirname, '..', 'package.json');
try {
  fs.statSync(packagePath);
} catch (err) {
  packagePath = path.resolve(__dirname, '..', '..', '..', 'package.json');
}

var config = module.exports = {
  port                    : kibana.port,
  host                    : kibana.host,
  elasticsearch           : kibana.elasticsearch_url,
  root                    : path.normalize(path.join(__dirname, '..')),
  quiet                   : false,
  kibana                  : kibana,
  package                 : require(packagePath),
  htpasswd                : htpasswdPath,
  buildNum                : '@@buildNum',
  maxSockets              : kibana.maxSockets,
  log_file                : kibana.log_file,
  request_timeout         : kibana.request_timeout,
  ping_timeout            : kibana.ping_timeout
};

config.plugins = [];
