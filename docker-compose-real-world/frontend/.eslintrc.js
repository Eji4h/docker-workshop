module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'react-app'],
  rules: {
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'comma-dangle': [2, 'always-multiline'],
    quotes: [2, 'single', { avoidEscape: true }],
    'simple-import-sort/exports': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
  },
};
