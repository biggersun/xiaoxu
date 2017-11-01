import { resolve } from 'path';
import fs from 'mz/fs';
import { projectDir, webpackAssets, webpackVendor, webpackManifest, isDev } from '../../config/env';

const assetsPath = resolve(projectDir, webpackAssets);

let originAssets;

async function getManifestDev() {
    const assetsInfo = await fs.readFile(assetsPath);
    const assets = JSON.parse(assetsInfo);

    return assets;
}

async function getManifestProd() {
    if (!originAssets) {
        const originAssetsInfo = await fs.readFile(assetsPath);
        originAssets = JSON.parse(originAssetsInfo);
    }

    return originAssets;
}

const getManifest = isDev ? getManifestDev : getManifestProd;

export default async function getPageAssets(page) {
    const assets = await getManifest(page);

    if (!assets[page]) {
        const err = new Error('您访问的页面已经飞去了月球');
        err.status = 404;

        throw err;
    }

    return [webpackManifest, webpackVendor, page].reduce((currentAssets, chunkName) => {
        if (!assets[chunkName]) {
            return currentAssets;
        }

        if (assets[chunkName].js) {
            // eslint-disable-next-line no-underscore-dangle
            currentAssets._script.push(assets[chunkName].js);
        }

        if (assets[chunkName].css) {
            // eslint-disable-next-line no-underscore-dangle
            currentAssets._stylesheet.push(assets[chunkName].css);
        }

        return currentAssets;
    }, {
        _script: [],
        _stylesheet: [],
    });
}

