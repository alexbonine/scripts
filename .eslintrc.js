module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 10,
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
    // 'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'brace-style': ['warn', '1tbs'],
    curly: ['warn', 'all'],
    'no-console': 'warn',
    'no-unused-vars': ['warn', { varsIgnorePattern: '[iI]gnored', argsIgnorePattern: '^_' }],
    'no-debugger': 'warn',
    indent: 'warn',
    semi: 'warn',
    quotes: ['warn', 'single'],
    'operator-linebreak': 'off',
    'import/no-unresolved': 'off', // airbnb // off unless workaround for ~
    'import/extensions': 'off', // airbnb // off unless workaround for ~
    'max-len': 'off', // airbnb
    'dot-notation': 'off', // airbnb
    'spaced-comment': 'warn', // airbnb
    'object-curly-newline': [
      'warn',
      {
        // airbnb
        ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      },
    ],
    'no-trailing-spaces': ['warn', { skipBlankLines: true }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'accum'] }], // airbnb - if change to props: false ?
    'arrow-parens': ['warn', 'always'], // airbnb
    'import/first': 'warn', // airbnb
    'object-shorthand': [
      'warn',
      'always',
      {
        // airbnb
        ignoreConstructors: false,
        avoidQuotes: false,
        avoidExplicitReturnArrows: false,
      },
    ],
    'no-useless-escape': 'off', // airbnb
    'no-prototype-builtins': 'off', // airbnb
    'func-names': ['warn', 'always', { generators: 'never' }], // airbnb
    'no-else-return': ['error', { allowElseIf: true }], // airbnb ?
    strict: 'off', // airbnb - temp off b/c constant files using module.exports from backend
    //temp off
    // 'no-unneeded-ternary': 'off',
    // 'no-mixed-operators': 'off',
    // 'object-curly-newline': 'off',
    // 'object-curly-newline': ['warn', { ObjectExpression: { multiline: true, minProperties: 5, consistent: false }, ObjectPattern: { multiline: true, minProperties: 5, consistent: false }, ImportDeclaration: { multiline: true, minProperties: 5, consistent: false }, ExportDeclaration: { multiline: true, minProperties: 5, consistent: false }}],

    // 'comma-dangle': 'off', // just parsing
    // 'indent': 'off',
    // 'comma-spacing': 'off',
    // 'eqeqeq': 'off',
    // 'semi': 'off',
    // 'prefer-template': 'off',
    // 'arrow-body-style': 'off',
    // 'space-before-function-paren': 'off',
    'import/prefer-default-export': 'off',
    'function-paren-newline': ['warn', 'consistent'], // airbnb 'multiline'
    // 'yoda': 'off',
    // 'one-var': 'off',
    // 'no-plusplus': 'off',
    // 'no-bitwise': 'off',
    // 'no-cond-assign': 'off',
    // 'prefer-arrow-callback': 'off',
    // 'no-shadow': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    // 'object-shorthand': 'off', // has a weird back-and-forth with func-names
    // 'func-names': 'off',
    // 'no-restricted-globals': 'off',
    // 'no-nested-ternary': 'off',
    // 'no-unused-expressions': 'off',
    // 'prettier/prettier': ['warn', { singleQuote: true, trailingComma: 'es5', arrowParens: 'always' }],
  },
  globals: {
    React: true,
  },
};
