module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'rules': {
    'complexity': 2,
    'arrow-parens': [
      'error',
      'always',
    ],
    'no-debugger': 'error',
    'no-empty': 'error',
    'require-jsdoc': 'off',
    'max-len': ['error', { 'code': 180 }],
    'object-curly-spacing': ['error', 'always'],
  },
};
