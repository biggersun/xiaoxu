const { resolve } = require('path');

const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';

const srcDir = process.cwd();
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

    // logs 目录
    logsDir: process.env.SERVER_LOG_DIR || resolve(projectDir, 'logs'),

    // api 接口代理地址
    apiProxy: process.env.API_PROXY || 'http://localhost:3000',
};
