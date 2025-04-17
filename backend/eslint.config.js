import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["src/**/*.{ts}"],
        languageOptions: {
            ecmaVersion: 2020,
        },
        plugins: {},
        rules: {},
    },
    eslintConfigPrettier,
);
