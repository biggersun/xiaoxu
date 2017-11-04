const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.basic');
const { distDir, appJsPath, loginJsPath } = require('./files.config');

const publicPath = '/';

const port = 8888;
const host = '0.0.0.0';
const hot = process.env.NODE_PROJECT_HOT === 'true';

process.env.BABEL_ENV = hot ? 'development.hot' : 'development';

const hotEntry = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
];

const hotPlugins = [
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),
];

module.exports = ({
    apiProxyHost = 'localhost',
    apiProxyPort = '3000',
    apiProxyProtocol = 'http:',
} = {}) => webpackMerge(commonConfig(), {
    devtool: 'cheap-source-map',

    entry: {
        vendor: [
            'moment',
            'react',
            'react-dom',
            'classnames',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-thunk',
            'urijs',
        ],
        app: hot ? [...hotEntry, appJsPath] : appJsPath,
        login: hot ? [...hotEntry, loginJsPath] : loginJsPath,
    },

    output: {
        publicPath,
        filename: 'js/[name].js',
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=2',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                    },
                ],
            },
        ],
    },

    plugins: hot ? hotPlugins : [],

    devServer: {
        port,
        host,
        hot,
        contentBase: distDir,
        historyApiFallback: true,
        disableHostCheck: true,
        stats: {
            chunks: false,
        },
        proxy: {
            '/api/*': {
                target: `${apiProxyProtocol}//${apiProxyHost}:${apiProxyPort}`,
                headers: {
                    Host: apiProxyHost,
                },
            },
        },
    },
});
