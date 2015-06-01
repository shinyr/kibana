
var _ = require('lodash');
var Promise = require('bluebird');
var {promisify} = Promise;
var babel = require('babel');
var {join, dirname, basename, relative} = require('path');
var fs = require('fs');

export class Builder {
  constructor(cwd, watcher) {
    this.relBase = join(cwd, '..');
    this.transformFile = promisify(babel.transformFile, babel);
    this.writeFile = promisify(fs.writeFile, fs);
    this.removeFile = promisify(fs.writeFile, fs);

    this.getPaths = function () {
      return _(watcher.watched()).values().flatten().value();
    };

    watcher.on('deleted', (path) => this.removeFile(this.expandPath(path)));
    watcher.on('changed', (path) => this.build([path]));
  }

  init() {
    return this.build(this.getPaths());
  }

  build(paths) {
    return Promise
    .map(paths, path => {
      var dir = dirname(path);
      var base = basename(path, '.jsx');
      var outPath = join(dir, base + '.js');

      this.transformFile(path, { sourceMaps: 'inline' })
      .then(file => this.writeFile(outPath, file.code, 'utf8'));
    })
    .then(() => console.log('built:' + paths.map(p => `\t${p}\n`)));
  }
}
