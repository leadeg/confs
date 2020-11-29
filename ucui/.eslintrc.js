module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
  },
  extends: 'airbnb',
  globals: {
    hwindow: true,
    document: true,
    window: true,
    hepsiBus: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'react/prefer-stateless-function': ['off'],
    'react/no-array-index-key': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/destructuring-assignment': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'class-methods-use-this': ['off'],
    'no-useless-constructor': ['off'],
    'import/no-unresolved': ['off'],
    'comma-dangle': ['off'],
    'import/first': ['off'],
    'arrow-parens': ['off'],
    'react/jsx-indent': [2, 2, { checkAttributes: false }],
    'max-len': ['error', { code: 160, tabWidth: 2 }],
    semi: ['off'],
  },
};
