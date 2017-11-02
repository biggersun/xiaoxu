const eslintrc = {
    extends: ['eslint-config-airbnb'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    plugins: [],
    globals: {
        $: true,
        db: true,
        store: true,
    },
    rules: {
        indent: ['error', 4],
        'max-len': ['error', 120],
        'no-shadow': 'off',
        'object-curly-newline': 'off',
        'no-restricted-globals': 'off',
        'no-multi-spaces': ['error', { ignoreEOLComments: true }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['*.js', 'config/*.js', '**/*.dev.js'] }],
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'config/webpack.config.dev.js',
            },
        },
    },
};

module.exports = eslintrc;
