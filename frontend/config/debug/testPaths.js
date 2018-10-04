/**
 * Check if paths exists
 */

import fs from 'fs';
import paths from '../paths';

export default function testPaths() {
  for (const p in paths) {
    const path_url = paths[p];

    if (typeof path_url === 'function') {
      continue;
    }

    if (fs.existsSync(path_url)) {
      // console.log(`Jest: ${p} ${path_url}`);
    } else {
      console.log(`Nie ma: ${p} ${path_url}`);
    }
  }
}
