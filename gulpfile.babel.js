import path from 'path';
import gulp from 'gulp';
import del from 'del';

import * as config from './frontend/config/config';
import paths from './frontend/config/paths';

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
