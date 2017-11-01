import * as http from '../http';
import { apiProxy } from '../../config/env';

function request(method, api, params, headers, httpOpt = {}) {
    const { host, cookie } = headers;

    // eslint-disable-next-line no-param-reassign
    httpOpt.headers = Object.assign({
        host,
        cookie,
    }, httpOpt.headers);

    return http[method](apiProxy + api, params, httpOpt);
}

export function get(...args) {
    return request('get', ...args);
}

export function post(...args) {
    return request('post', ...args);
}

export const { CustomFetchError } = http;
