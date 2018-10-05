import path from 'path';
import gulp from 'gulp';
import del from 'del';

import core from '@hub33k/frontend-starter-core';

const config = core.config;
const paths = core.paths;

// Clean output directories
gulp.task('clean:tmp', () => del([
  path.resolve(paths.appTmp) + '/*'
], {dot: true}));

gulp.task('clean:dist', () => del([
  path.resolve(paths.appBuild) + '/*',
  '!' + path.resolve(paths.appBuild, '.git'),
], {dot: true}));

// Default task
gulp.task('default', (cb) => {
  console.log('Default task');
  console.log('config:', config);
  console.log('paths:', paths);
  cb();
});
