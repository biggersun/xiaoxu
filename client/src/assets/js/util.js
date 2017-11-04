import { UPLOAD_FILE, UPLOAD_FILE_OPTIMIZE } from 'constants/api';
import { uploadFile } from 'assets/js/request';
import { notification } from 'antd';
import URI from 'urijs';
import { ROOT_PATH } from 'constants/router';
import download from 'assets/js/download';

export const toApp = () => {
    const uri = new URI(ROOT_PATH);

    uri.setQuery({
        timestamp: new Date().getTime(),
    });

    location.href = uri.toString();
};

export function uploadImage(data, options = {}, opts = { optimize: true }) {
    const params = {
        width: 100,
        height: 100,
        imgFile: data,
        filename: `${+new Date()}.png`,
    };

    Object.assign(params, options);

    return uploadFile(opts.optimize ? UPLOAD_FILE_OPTIMIZE : UPLOAD_FILE, params);
}

export function copyTextFromInput(input) {
    input.select();

    let succeeded;

    try {
        succeeded = document.execCommand('copy');
    } catch (err) {
        succeeded = false;
    }

    if (succeeded) {
        notification.success({
            message: '提示信息',
            description: '复制成功',
        });
    } else {
        notification.error({
            message: '提示信息',
            description: '选择后，按 ctrl + c',
        });
    }

    return succeeded;
}

export function relativeToRoot(path) {
    if (!path.startsWith(ROOT_PATH)) {
        throw new Error(`path should be sub path of ${ROOT_PATH}`);
    }

    return path.slice(ROOT_PATH.length);
}

export function equalByProps(obj1, obj2, props) {
    return props.every(prop => obj1[prop] === obj2[prop]);
}

export const phoneReg = /^1[34578]\d{9}$/;

export const actionCreator = type => payload => ({ type, payload });

export const matchSidebarItem = (key, path) => path === key || path.startsWith(`${key}/`);

export const downloadFile = (url, params) => {
    const downloadUri = new URI(url);
    downloadUri.setQuery(params);
    download(downloadUri.toString());
};
