import path from 'path';
import gulp from 'gulp';
import del from 'del';

import * as config from './frontend/config/config';

// Clean output directories
gulp.task('clean:tmp', () => del([
  path.resolve(config.TMP_DIR) + '/*'
], {dot: true}));

gulp.task('clean:dist', () => del([
  path.resolve(config.DIST_DIR) + '/*',
  '!' + path.resolve(config.DIST_DIR, '.git'),
], {dot: true}));

// Default task
gulp.task('default', (cb) => {
  console.log('Default task');
  console.log('config:', config);
  cb();
});
