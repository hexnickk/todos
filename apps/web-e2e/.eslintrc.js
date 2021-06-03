module.exports = {
    extends: ['../../.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
};
