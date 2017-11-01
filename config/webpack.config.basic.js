const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const {
    environment,
    srcDir,
    projectDir,
    staticDir,
    srcPagesDir,
    publicPath,
    resolveModules,
    webpackAssets,
    webpackVendor,
    webpackManifest,
} = require('./env');

module.exports = () => {
    const extractVendor = new webpack.optimize.CommonsChunkPlugin({
        name: [webpackVendor, webpackManifest],
        minChunks: Infinity,
    });

    const defineEnvironment = new webpack.EnvironmentPlugin({
        NODE_ENV: environment,
    });

    const assetsPlugin = new AssetsPlugin({
        filename: webpackAssets,
        path: projectDir,
    });

    const entry = fs.readdirSync(srcPagesDir).reduce((pre, page) => {
        const jsPath = path.resolve(srcPagesDir, page, 'index.js');

        let stat;

        try {
            stat = fs.statSync(jsPath);
        } catch (e) {
            // no catch
        }

        if (stat && stat.isFile()) {
            pre[page] = jsPath; // eslint-disable-line no-param-reassign
        }

        return pre;
    }, {
        vendor: [
            'isomorphic-fetch',
            'babel-polyfill',
            'fastclick',
            'weui',
            'weui.js',
            'urijs',
            'zepto',
            'swipe-js-iso',
            'moment',
            'lib/stat',
        ],
    });

    return {
        context: srcDir,

        stats: {
            chunks: false,
            children: false,
            colors: true,
            exclude: ['node_modules'],
        },

        entry,

        output: {
            path: staticDir,
            publicPath,
        },

        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader?forceEnv=browser',
                },
                {
                    test: require.resolve('zepto'),
                    loader: 'imports-loader?this=>window',
                },
                {
                    test: /\.(njk|nunjucks)$/,
                    use: 'nunjucks-loader',
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=10000&minetype=application/font-woff&name=font/[name].[hash].[ext]',
                },
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=10000&minetype=application/font-woff&name=font/[name].[hash].[ext]',
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=10000&minetype=application/octet-stream&name=font/[name].[hash].[ext]',
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'file-loader?name=font/[name].[hash].[ext]',
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=10000&minetype=image/svg+xml&name=font/[name].[hash].[ext]',
                },
                {
                    test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                    use: 'url-loader?limit=10000&name=img/[name].[hash:20].[ext]',
                },
            ],
        },

        plugins: [
            extractVendor,
            defineEnvironment,
            assetsPlugin,
        ],

        resolve: {
            modules: resolveModules,
            extensions: ['*', '.js', '.css'],
        },
    };
};
