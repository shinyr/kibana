var fs = require('fs');
var join = require('path').join;
module.exports = function (grunt) {
  grunt.registerTask('chmod_kibana', 'Chmods bin/kibana', function () {
    var done = this.async();
    var path = join(grunt.config.get('build'), 'dist', 'kibana', 'bin', 'kibana');
    fs.chmod(path, parseInt('0755', 8), done);
  });
};
