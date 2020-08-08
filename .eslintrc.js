module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react","prettier"],
    extends: [
        "airbnb",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            "jsx": true
        }
    },
    env: {
        es6: true,
        browser: true
    },
    rules: {
        'prettier/prettier': 'error',
        'no-undef': 0,
        'no-plusplus': 0,
        'no-underscore-dangle': 0,
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx', '.ts', 'tsx'] }],
        'react/jsx-props-no-spreading': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-associated-control': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 0,
    }
}
