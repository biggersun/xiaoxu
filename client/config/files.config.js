const { resolve } = require('path');
const { clientSrcDir: srcDir, staticDir: distDir } = require('../../config/env.js');

const mainDir = resolve(srcDir, 'main');
const loginDir = resolve(srcDir, 'login');
const appJsPath = resolve(mainDir, 'index.jsx');
const loginJsPath = resolve(loginDir, 'index.jsx');
const appHtmlPath = resolve(mainDir, 'index.html');

const resolveModules = [srcDir, 'node_modules'];

module.exports = {
    distDir,
    mainDir,
    appJsPath,
    loginJsPath,
    appHtmlPath,
    resolveModules,
};
