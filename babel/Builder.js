
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
    this.removeFile = promisify(fs.unlink, fs);

    this.getPaths = function () {
      return _(watcher.watched()).values().flatten().value();
    };

    watcher.on('deleted', (path) => this.unbuild(path));
    watcher.on('changed', (path) => this.build([path]));
  }

  init() {
    return this.build(this.getPaths());
  }

  expandPath(path) {
    var dir = dirname(path);
    var base = basename(path, '.jsx');
    return join(dir, base + '.js');
  }

  build(paths) {
    return Promise
    .map(paths, path => {
      this.transformFile(path, { sourceMaps: 'inline' })
      .then(file => this.writeFile(this.expandPath(path), file.code, 'utf8'));
    })
    .then(() => console.log('built:' + paths.map(p => `\t${p}\n`).join('')));
  }

  unbuild(path) {
    var outFile = this.expandPath(path);
    return this.removeFile(outFile).then(() => {
      console.log(`removed: ${outFile}`);
    });
  }
}
