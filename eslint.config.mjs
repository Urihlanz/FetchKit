import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "eslint-plugin-react";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: ["**/node_modules", "**/build", "**/dist", "**/public"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ),
  {
    plugins: {
      react,
      tailwindcss,
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2024,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,

        ecmaFeatures: {
          jsx: true,
          arrowFunctions: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "no-unused-vars": "warn",
      eqeqeq: ["warn", "always"],
      "no-var": "error",

      "prefer-arrow-callback": [
        "warn",
        {
          allowNamedFunctions: false,
        },
      ],

      "func-style": [
        "warn",
        "expression",
        {
          allowArrowFunctions: true,
        },
      ],

      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-array-index-key": "off",
      "react/self-closing-comp": "warn",
      "react/no-unescaped-entities": "error",
      "react/jsx-no-target-blank": "error",

      "react/jsx-no-useless-fragment": [
        "warn",
        {
          allowExpressions: true,
        },
      ],

      "react/sort-comp": "error",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/ban-ts-comment": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/no-unsafe-call": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/restrict-template-expressions": 0,
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/ban-types": 0,
      "@typescript-eslint/no-floating-promises": 0,
      "@typescript-eslint/require-await": 0,
      "jsx-quotes": ["error", "prefer-double"],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/display-name": 0,
      "no-undef": "off",
      "no-console": 0,
      "newline-before-return": 2,
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],

      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],

          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],

          "newlines-between": "always",
        },
      ],
    },
  },
];

export default eslintConfig;
