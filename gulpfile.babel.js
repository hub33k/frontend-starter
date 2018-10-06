import path from 'path';
import gulp from 'gulp';
import del from 'del';

import {paths, config} from '@hub33k/frontend-starter-core';

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
