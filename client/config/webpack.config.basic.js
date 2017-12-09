const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { appHtmlPath } = require('./files.config');
const { publicPath, staticDir, clientSrcDir } = require('../../config/env');

module.exports = () => {
    const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

    const generateIndex = new HtmlWebpackPlugin({
        inject: 'body',
        filename: 'index.html',
        template: appHtmlPath,
        chunks: ['manifest', 'vendor', 'app'],
    });

    const generateLogin = new HtmlWebpackPlugin({
        inject: 'body',
        filename: 'login.html',
        template: appHtmlPath,
        chunks: ['manifest', 'vendor', 'login'],
    });

    const extractVendor = new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        chunks: ['vendor', 'app', 'login'],
    });

    const extractManifest = new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
        chunks: ['manifest', 'vendor', 'app', 'login'],
    });

    const defineEnvironment = new webpack.EnvironmentPlugin({
        NODE_ENV,
    });

    const fixMomentImport = new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/);

    return {
        context: clientSrcDir,

        stats: {
            chunks: false,
            children: false,
        },

        output: {
            path: staticDir,
            publicPath,
        },

        module: {
            rules: [
                {
                    test: /\.htm(l)?$/,
                    use: 'html-loader',
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
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
            extractManifest,
            extractVendor,
            generateIndex,
            generateLogin,
            defineEnvironment,
            fixMomentImport,
        ],

        resolve: {
            modules: [clientSrcDir, 'node_modules'],
            extensions: ['*', '.js', '.jsx', '.css', '.scss'],
        },
    };
};
