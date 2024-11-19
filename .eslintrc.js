module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
  },
  plugins: [
    'import',
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
    'sort-class-members',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'data-source.ts'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'none',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['interface'],
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/first': 1,
    'import/named': 1,
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-console': 'error',
    'unused-imports/no-unused-imports': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['error-messages.ts', 'exceptions.ts'],
      rules: {
        'prettier/prettier': 'off',
        'lines-between-class-members': ['error', 'never'],
        'sort-class-members/sort-class-members': [
          'error',
          {
            order: [
              '[static-properties]',
              '[static-methods]',
              '[properties]',
              'constructor',
              '[methods]',
            ],
            groups: {
              'static-properties': [
                { static: true, propertyType: 'PropertyDefinition' },
              ],
              'static-methods': [
                { static: true, propertyType: 'MethodDefinition' },
              ],
              properties: [
                { static: false, propertyType: 'PropertyDefinition' },
              ],
              methods: [{ static: false, propertyType: 'MethodDefinition' }],
            },
          },
        ],
      },
    },
  ],
};
