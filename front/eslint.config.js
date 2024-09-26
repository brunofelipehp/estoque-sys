import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";

export default [
  {
    files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    languageOptions: {
      parser: eslintParserTypeScript,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
      "@typescript-eslint": eslintPluginTypeScript,
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // React 17+ não precisa do import React em cada arquivo JSX
      "require-jsdoc": "off", // Desabilitar regra de JSDoc
    },
  },
];
