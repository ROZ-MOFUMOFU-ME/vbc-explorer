import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
];

eslintConfig.push({
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
        parserOptions: {
            projectService: true,
        },
    },
    ignores: [
        "node_modules",
        "db - internal.js",
        "gulpfile.js",
        "*.min.js"
    ],
    rules: {
        "array-bracket-spacing": 2,
        "block-scoped-var": 2,
        "brace-style": [2, "1tbs", { "allowSingleLine": true }],
        "comma-spacing": [2, { "before": false, "after": true }],
        "comma-style": [2, "last"],
        "complexity": 0,
        "consistent-return": 1,
        "consistent-this": 0,
        "curly": [2, "multi-line"],
        "default-case": 0,
        "dot-location": [2, "property"],
        "dot-notation": 0,
        "eol-last": 2,
        "eqeqeq": [2, "allow-null"],
        "func-names": 0,
        "func-style": 0,
        "generator-star-spacing": [2, "both"],
        "guard-for-in": 0,
        "handle-callback-err": [2, "^(err|error|anySpecificError)$"],
        "indent": [2, 2, { "SwitchCase": 1 }],
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "linebreak-style": 0,
        "max-depth": 0,
        "max-len": [2, 1550, 4],
        "max-nested-callbacks": 0,
        "max-params": 0,
        "max-statements": 0,
        "new-cap": [2, { "newIsCap": true, "capIsNew": false }],
        "newline-after-var": [0, "never"],
        "new-parens": 2,
        "no-alert": 0,
        "no-array-constructor": 2,
        "no-bitwise": 0,
        "no-caller": 2,
        "no-catch-shadow": 0,
        "no-cond-assign": 2,
        "no-console": 0,
        "no-constant-condition": 0,
        "no-continue": 0,
        "no-control-regex": 2,
        "no-debugger": 0,
        "no-delete-var": 2,
        "no-div-regex": 0,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-else-return": 2,
        "no-empty": 0,
        "no-empty-character-class": 2,
        "no-labels": 2,
        "no-eq-null": 0,
        "no-eval": 2,
        "no-ex-assign": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-parens": 0,
        "no-extra-semi": 0,
        "no-extra-strict": 0,
        "no-fallthrough": 2,
        "no-floating-decimal": 2,
        "no-func-assign": 2,
        "no-implied-eval": 2,
        "no-inline-comments": 0,
        "no-inner-declarations": [2, "functions"],
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-iterator": 2,
        "no-label-var": 2,
        "no-lone-blocks": 0,
        "no-lonely-if": 0,
        "no-loop-func": 0,
        "no-mixed-requires": 0,
        "no-mixed-spaces-and-tabs": [2, false],
        "no-multi-spaces": 2,
        "no-multi-str": 0,
        "no-multiple-empty-lines": [2, { "max": 1 }],
        "no-native-reassign": 2,
        "no-negated-in-lhs": 2,
        "no-nested-ternary": 0,
        "no-new": 2,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-new-require": 2,
        "no-new-wrappers": 2,
        "no-obj-calls": 2,
        "no-octal": 2,
        "no-octal-escape": 2,
        "no-path-concat": 0,
        "no-plusplus": 0,
        "no-process-env": 0,
        "no-process-exit": 0,
        "no-proto": 2,
        "no-redeclare": 2,
        "no-regex-spaces": 2,
        "no-reserved-keys": 0,
        "no-restricted-modules": 0,
        "no-script-url": 0,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-shadow": 0,
        "no-shadow-restricted-names": 2,
        "no-spaced-func": 2,
        "no-sparse-arrays": 2,
        "no-sync": 0,
        "no-ternary": 0,
        "no-throw-literal": 2,
        "no-trailing-spaces": 2,
        "no-undef": 0,
        "no-undef-init": 2,
        "no-undefined": 0,
        "no-underscore-dangle": 0,
        "no-unneeded-ternary": 2,
        "no-unreachable": 2,
        "no-unused-expressions": 0,
        "no-unused-vars": [2, { "vars": "all", "args": "none" }],
        "no-var": 2,
        "no-void": 0,
        "no-warning-comments": 0,
        "no-with": 2,
        "object-curly-spacing": [2, "always"],
        "one-var": 0,
        "operator-assignment": 0,
        "operator-linebreak": [2, "after"],
        "padded-blocks": 0,
        "prefer-const": 2,
        "quote-props": 0,
        "quotes": [2, "single", "avoid-escape"],
        "radix": 2,
        "jsx-quotes": [2, "prefer-single"],
        "semi-spacing": 0,
        "sort-vars": 0,
        "space-before-blocks": [2, "always"],
        "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }],
        "space-in-parens": [2, "never"],
        "space-infix-ops": 2,
        "keyword-spacing": 2,
        "space-unary-ops": [2, { "words": true, "nonwords": false }],
        "spaced-comment": [0, "always"],
        "strict": 0,
        "use-isnan": 2,
        "valid-jsdoc": 0,
        "valid-typeof": 2,
        "vars-on-top": 2,
        "wrap-iife": [2, "any"],
        "wrap-regex": 0,
        "yoda": [2, "never"]
    },
});

export default eslintConfig;
