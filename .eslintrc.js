// eslint-disable-next-line
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        node: true,
    },
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'prefer-const': 0,
    },
};
