// import airbnbBase from 'eslint-config-airbnb-base';
// import prettierConfig from 'eslint-config-prettier';
// import importPlugin from 'eslint-plugin-import';
// import prettierPlugin from 'eslint-plugin-prettier';

// export default [
//   {
//     ignores: ['node_modules/**', 'dist/**'],
//   },
//   {
//     files: ['**/*.js', '**/*.ts'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//     },
//     plugins: {
//       import: importPlugin,
//       prettier: prettierPlugin,
//     },
//     rules: {
//       ...airbnbBase.rules,
//       'prettier/prettier': 'error', // Força o uso do Prettier
//     },
//   },
//   prettierConfig,
// ];

import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import airbnbBase from 'eslint-config-airbnb-base';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'], // Inclua os arquivos TS/TSX
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser, // Parser do TypeScript
      parserOptions: {
        project: './tsconfig.json', // Certifique-se de que o caminho para o tsconfig.json está correto
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin, // Adicione o plugin do TypeScript
    },
    rules: {
      ...airbnbBase.rules,
      'prettier/prettier': 'error', // Força o uso do Prettier
      '@typescript-eslint/no-unused-vars': 'warn', // Evita erros em variáveis não utilizadas
      '@typescript-eslint/no-explicit-any': 'off', // Desabilita o erro para o uso de "any"
      '@typescript-eslint/explicit-function-return-type': 'off', // Desabilita erro de tipos explícitos em funções
      'no-unused-vars': 'off', // Evita conflitos com o plugin do TypeScript
      'no-undef': 'off', // Evita conflito para tipos TypeScript
    },
  },
  prettierConfig,
];
