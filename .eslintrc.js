module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react', 'prettier/@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    settings: {
        react: { version: 'detect' },
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    },
    ignorePatterns: ['*.d.ts'],
};
