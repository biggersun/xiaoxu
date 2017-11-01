import weui from 'weui.js';
import * as http from './http';
import { getChannel } from './channelStat';
import getAuthUrl from './auth';

let requestNum = 0;

let loadingInstance;

function increaseRequest() {
    if (requestNum === 0) {
        loadingInstance = weui.loading('请稍等');
    }

    requestNum += 1;
}

function decreaseRequest() {
    requestNum -= 1;

    if (requestNum === 0) {
        loadingInstance.hide();
    }
}

function getUrlWithChannelQuery(url) {
    const channelQuery = getChannel();
    const paramsStr = http.buildQuery(channelQuery);
    const connector = url.includes('?') ? '&' : '?';

    return url + (paramsStr ? `${connector}${paramsStr}` : '');
}

async function request(method, url, params, opt = {}, httpOpt) {
    const {
        needLoading = true,
        checkAccount = true,
        showErrorMsg = true,
    } = opt;

    if (needLoading) {
        increaseRequest();
    }

    let res;

    const api = getUrlWithChannelQuery(url);

    try {
        res = await http[method](api, params, httpOpt);
    } catch (e) {
        if (checkAccount && e.errno === 4 && e.data.errno === 25001) {
            location.href = getAuthUrl(params.merchantId, location.href);
        }

        if (showErrorMsg) {
            weui.alert(e.errno === 4 ? e.data.msg : e.msg, {
                title: '错误提示',
            });
        }

        throw e;
    } finally {
        if (needLoading) {
            decreaseRequest();
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
