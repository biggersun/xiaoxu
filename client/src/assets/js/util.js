import { uploadFile } from 'assets/js/request';
import URI from 'urijs';
import { ROOT_PATH } from 'constants/router';
import download from 'assets/js/download';

export const phoneReg = /^1[34578]\d{9}$/;
export const regPhone = /^(1)\d{10}$/;
export const regYzm = /^\d{6}$/;
export const regCount = /^\+?[1-9]\d*$/;
export const regNumber = /^(\d+|\d+\.\d+|\.\d+)$/;
export const regInteger = /^[0-9]*$/;
export const regNumberAndWord = /^[0-9a-zA-Z]+$/;
export const regNumberFix = /(\.00)$/;
export const regPassword = /^(\w){6,20}$/;
export const regUserName = /^[^!@#$%^&*]*$/;

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

    return uploadFile(params);
}

export function copyTextFromInput(input) {
    input.select();

    let succeeded;
    let msg;

    try {
        succeeded = document.execCommand('copy');
    } catch (err) {
        succeeded = false;
    }

    if (succeeded) {
        msg = {
            message: '提示信息',
            description: '复制成功',
        };
    } else {
        msg = {
            message: '提示信息',
            description: '选择后，按 ctrl + c',
        };
    }

    return succeeded;
}

export function relativeToRoot(path) {
    if (!path.startsWith(ROOT_PATH)) {
        throw new Error(`path should be sub path of ${ROOT_PATH}`);
    }

    return path.slice(ROOT_PATH.length);
}


export const actionCreator = type => payload => ({ type, payload });

export const matchSidebarItem = (key, path) => path === key || path.startsWith(`${key}/`);

export const downloadFile = (url, params) => {
    const downloadUri = new URI(url);
    downloadUri.setQuery(params);
    download(downloadUri.toString());
};
