module.exports = function (grunt) {
  var config = {
    less: {
      files: [
        '<%= app %>/**/styles/**/*.less',
        '<%= plugins %>/*/styles/**/*.less',
        '<%= plugins %>/*/*.less',
        '<%= app %>/**/components/**/*.less',
        '<%= app %>/**/components/vislib/components/styles/**/*.less'
      ],
      tasks: ['less:dev']
    }
  };

  if (grunt.option('no-test-watcher')) {
    // unset the test watcher
    delete config.test;
  }

  return config;
};
