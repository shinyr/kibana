module.exports = {
  options: {
    sourceMapBasepath: '<%= src %>/kibana',
    sourceMapRootpath: '/',
    ieCompat: false,
    paths: [
      '<%= nodeModules %>/',
      '<%= nodeModules %>/lesshat/build/'
    ]
  },
  dev: {
    src: '<%= lessFiles %>',
    expand: true,
    ext: '.css',
    options: {
      sourceMap: true
    }
  },
  build: {
    src: '<%= lessFiles %>',
    expand: true,
    ext: '.css',
    options: {
      sourceMap: false
    }
  }
};
