module.exports = {
    globals: {
        tw: true,
    },
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
        project: './tsconfig.json',
        tsconfigRootDir: './',
    },
    settings: {
        react: { version: 'detect' },
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'off',
                mjs: 'off',
                jsx: 'off',
                ts: 'off',
                tsx: 'off',
            },
        ],
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
    },
    ignorePatterns: ['*.d.ts'],
};
