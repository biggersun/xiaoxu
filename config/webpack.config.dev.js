const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.basic');

module.exports = () => webpackMerge(commonConfig(), {
    devtool: 'cheap-source-map',

    output: {
        filename: 'js/[name].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader',
                ],
            },
        ],
    },
});
