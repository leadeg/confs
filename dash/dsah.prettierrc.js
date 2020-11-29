module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  overrides: [
    {
      files: ['*.sass', '*.scss', '*.html'],
      options: {
        printWidth: 160,
      },
    },
  ],
};
