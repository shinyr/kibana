module.exports = function (grunt) {
  var resolve = require('path').resolve;
  var directory = resolve(__dirname, '../../esvm');
  var dataDir = resolve(directory, 'data_dir');
  var serverConfig = require('../../test/server_config');

  return {
    options: {
      branch: 'master',
      fresh: !grunt.option('esvm-no-fresh'),
      config: {
        network: {
          host: '127.0.0.1'
        },
        http: {
          port: 9200
        }
      }
    },
    dev: {
      options: {
        directory: resolve(directory, 'dev'),
        config: {
          path: {
            data: dataDir
          },
          cluster: {
            name: 'esvm-dev'
          }
        }
      }
    },
    test: {
      options: {
        directory: resolve(directory, 'test'),
        purge: true,
        config: {
          http: {
            port: serverConfig.servers.elasticsearch.port
          },
          cluster: {
            name: 'esvm-test'
          }
        }
      }
    },
    ui: {
      options: {
        directory: resolve(directory, 'test'),
        purge: true,
        config: {
          http: {
            port: serverConfig.servers.elasticsearch.port
          },
          cluster: {
            name: 'esvm-ui'
          }
        }
      }
    },
    withPlugins: {
      options: {
        version: '2.1.0',
        directory: resolve(directory, 'withPlugins'),
        plugins: [
          'license',
          'shield',
          'marvel-agent',
          'watcher'
        ],
        shield: {
          users: [
            {
              username: 'kibana',
              password: 'notsecure',
              roles: ['kibana4_server']
            },
            {
              username: 'user',
              password: 'notsecure',
              roles: ['kibana4', 'marvel']
            },
            {
              username: 'admin',
              password: 'notsecure',
              roles: ['admin']
            }
          ]
        },
        config: {
          marvel: {
            agent: {
              interval: '60s'
            }
          }
        }
      }
    }
  };
};
