const { resolve } = require('path');

const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';

const srcDir = resolve(process.cwd(), 'src');
const distDir = resolve(srcDir, 'dist');
const projectDir = isDev ? srcDir : distDir;

const serverPublicPath = '/';

module.exports = {
    // 当前执行环境: 'production' | 'development'
    environment,

    // 是否生产环境
    isDev,

    // 源码目录
    srcDir,

    // 编译源码目录
    distDir,

    // 执行代码根目录
    projectDir,

    // 静态资源目录
    staticDir: resolve(projectDir, 'static'),

    // 页面源码目录
    srcPagesDir: resolve(srcDir, 'views'),

    // 页面目录
    pagesDir: resolve(projectDir, 'views'),

    // 整个应用的路径前缀
    serverPublicPath,

    // webpack publicPath
    publicPath: `${serverPublicPath}static/`,

    // webpack resolveModules
    resolveModules: [srcDir, 'node_modules'],

    // vendor 文件名称
    webpackVendor: 'vendor',

    // manifest 文件名称
    webpackManifest: 'manifest',

    // webpack 资源清单
    webpackAssets: 'webpack-assets.json',

    // logs 目录
    logsDir: process.env.SERVER_LOG_DIR || resolve(projectDir, 'logs'),

    // api 接口代理地址
    apiProxy: process.env.API_PROXY || 'http://',
};
