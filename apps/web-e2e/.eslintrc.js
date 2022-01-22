module.exports = {
    extends: ['@todoapp/eslint-config-typescript'],
    rules: {
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
};
