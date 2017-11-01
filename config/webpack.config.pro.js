const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const commonConfig = require('./webpack.config.basic');

const extractCSS = new ExtractTextPlugin('css/[name].[contenthash:20].css');

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
        warnings: false,
        drop_console: false,
        collapse_vars: true,
        reduce_vars: true,
    },
});

module.exports = () => webpackMerge(commonConfig(), {
    bail: true,

    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract([
                    'css-loader?importLoaders=1&minimize',
                    'postcss-loader',
                ]),
            },
        ],
    },

    plugins: [
        new WebpackChunkHash(),
        extractCSS,
        uglifyJs,
    ],
});
