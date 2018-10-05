module.exports = api => {
  api.cache(false);

  const presets = [
    '@babel/preset-env',
  ];

  const plugins = [];

  return {
    presets,
    plugins,
  };
};
