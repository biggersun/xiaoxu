import Loading from 'components/Loading';
import Toast from 'components/Toast';
import { LOGIN_URL } from 'constants/basic';
import * as http from './http';

const loading = Loading.newInstance();
const toast = Toast.newInstance();

async function request(method, url, params, opt = {}, httpOpt) {
    const {
        needLoading = true,
        checkAccount = true,
        showErrorMsg = true,
    } = opt;

    if (needLoading) {
        loading.add();
    }

    let res;

    try {
        res = await http[method](url, params, httpOpt);
    } catch (e) {
        if (checkAccount && e.errno === 4 && e.data.errno === 10000) {
            location.href = LOGIN_URL;
        }

        if (showErrorMsg) {
            toast.show(e.errno === 4 ? e.data.msg : e.msg);
        }

        throw e;
    } finally {
        if (needLoading) {
            loading.remove();
        }
        if (showErrorMsg) {
            // toast.destory();
        }
    }

    return res;
}

export function get(...arg) {
    return request('get', ...arg);
}

export function post(...arg) {
    return request('post', ...arg);
}

export function uploadFile(url, params, opt = {}, httpOpt) {
    const newOpt = Object.assign({
        needLoading: false,
    }, opt);

    return request('uploadFile', url, params, newOpt, httpOpt);
}
