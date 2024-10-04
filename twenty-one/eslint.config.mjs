import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
    {
        // Apply configuration to JavaScript and JSX files
        files: ["**/*.js", "**/*.jsx"],
        languageOptions: {
            ecmaVersion: "latest", // Use the latest ECMAScript standard
            sourceType: "module", // Use ES modules
            globals: {
                ...globals.browser, // Include browser global variables like 'window', 'document', etc.
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true, // Enable JSX parsing
                },
            },
        },
        plugins: {
            js: pluginJs, // Base JS rules
            react: pluginReact, // React plugin for JSX and React-specific rules
        },
    },
];
