module.exports = function (api) {
  const env = api.env();

  const basePlugins = [
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
  ];

  const basePresets = [];

  let presets = [...basePresets];
  let plugins = [...basePlugins];

  if (env === 'test') {
    presets.push([
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
      },
    ]);
  } else {
    if (env === 'production') {
      plugins.push([
        'transform-react-remove-prop-types',
        {
          mode: 'remove',
          removeImport: true,
          additionalLibraries: ['react-immutable-proptypes'],
        },
      ]);
    } else {
      plugins.push('react-hot-loader/babel');
    }

    presets.push([
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ]);
  }

  presets.push('@babel/preset-react');

  return {
    presets,
    plugins,
  };
};
