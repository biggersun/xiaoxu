const smartImport = require('postcss-smart-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const vars = require('postcss-simple-vars');
const calc = require('postcss-calc');
const { resolveModules } = require('./client/config/files.config');

module.exports = (ctx) => {
    const isLess = /^\.less$/i.test(ctx.file.extname);

    const autoprefixerPlugin = autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 10'],
    });

    const config = {};

    if (isLess) {
        config.plugins = [autoprefixerPlugin];
    } else {
        config.plugins = [
            smartImport({
                path: resolveModules,
            }),
            calc(),
            precss(),
            autoprefixerPlugin,
        ];
    }

    return config;
};
