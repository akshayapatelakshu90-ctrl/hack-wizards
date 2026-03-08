import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "react-refresh": reactRefreshPlugin
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true }
            },
            globals: {
                ...globals.browser,
                ...globals.es2021
            }
        },
        rules: {
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "no-unused-vars": "warn",
            "react/prop-types": "off",
        }
    }
];
