const { resolve } = require('path');

const projectDir = resolve(process.cwd(), 'client');
const srcDir = resolve(projectDir, 'src');
const distDir = resolve(projectDir, 'dist');
const mainDir = resolve(srcDir, 'main');
const loginDir = resolve(srcDir, 'login');
const appJsPath = resolve(mainDir, 'index.jsx');
const loginJsPath = resolve(loginDir, 'index.jsx');
const appHtmlPath = resolve(mainDir, 'index.html');

console.log('projectDir', projectDir);
const resolveModules = [srcDir, 'node_modules'];

module.exports = {
    projectDir,
    srcDir,
    distDir,
    mainDir,
    appJsPath,
    loginJsPath,
    appHtmlPath,
    resolveModules,
};
