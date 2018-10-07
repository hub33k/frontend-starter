module.exports = {
  presets: [
    [
      '@babel/preset-env',
    ],
  ],
  babelrcRoots: [
    // Keep the root as a root
    '.',

    // Also consider monorepo packages "root" and load their .babelrc files.
    './frontend/config/*'
  ],
};
