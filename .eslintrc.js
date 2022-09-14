module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'react-app',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['node_modules', 'build', 'dist', 'antlr'],
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    'no-return-await': 'error',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-var': 'error',
    'no-else-return': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
        ],
        pathGroups: [{ pattern: '@app/**', group: 'internal', position: 'after' }],
        pathGroupsExcludedImportTypes: ['@app/**'],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': ['error', { tabWidth: 2 }],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: false,
        noSortAlphabetically: true,
      },
    ],
  },
  overrides: [
    {
      files: ['**/?(*.)+(story).[jt]s?(x)'],
      rules: {
        'jsx-a11y/alt-text': 'off',
      },
    },
  ],
};
