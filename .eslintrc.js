const eslintrc = {
    extends: ['eslint-config-airbnb'],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    plugins: [],
    globals: {
        db: true
    },
    rules: {
        indent: ['error', 4],
        'max-len': ['error', { code: 120, ignoreStrings: true }],
        'no-shadow': 'off',
        'no-return-assign': 'off',
        'consistent-return': 'off',
        'no-mixed-operators': 'off',
        'class-methods-use-this': 'off',
        'prefer-destructuring': 'off',
        'object-curly-newline': 'off',
        'function-paren-newline': 'off',
        'no-restricted-globals': 'off',
        'no-multi-spaces': ['error', { ignoreEOLComments: true }],
        'react/jsx-indent': ['error', 4],
        'react/no-array-index-key': 'off',
        'react/require-default-props': 'off',
        'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
        'react/jsx-indent-props': ['error', 4],
        'react/forbid-prop-types': ['error', { forbid: ['any'] }],
        'react/default-props-match-prop-types': 'off',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'client/config/webpack.config.dev.js'
            }
        }
    }
};

module.exports = eslintrc;
