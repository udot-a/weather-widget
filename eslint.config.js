import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.vue', '**/*.js'],
    plugins: {
      prettier: pluginPrettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
    },
  },
];
