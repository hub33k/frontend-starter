module.exports = api => {
  api.cache(false);

  const presets = [
    '@babel/preset-env',
  ];

  const plugins = [];

  return {
    presets,
    plugins,
    babelrcRoots: [
      // Keep the root as a root
      '.',

      // Also consider monorepo packages "root" and load their .babelrc files.
      './frontend/config/*'
    ]
  };
};
