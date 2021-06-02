module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        "node": true
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "react-app",
        "react-app/jest"
    ],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": 0
    }
};
