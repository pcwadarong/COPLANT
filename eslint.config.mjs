import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ignores: ['.next/*', 'node_modules/*', '!src/**/*'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      next: nextPlugin,
    },
    rules: {
      // Stylistic
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      // '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],

      // Next.js best practice
      'next/no-img-element': 'warn',
      'next/no-sync-scripts': 'warn',
      'next/no-head-element': 'warn',

      // 기타 정리 규칙
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$'],
            ['^next', '^@?\\w'],
            ['^(@|components|utils|hooks)(/.*|$)'],
            ['^.+\\.d\\.ts$', '^.*\\btype\\b'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css|scss)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // TS 전용 룰
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default config;
