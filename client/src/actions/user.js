import { ACCOUNT_LOGOUT, ACCOUNT_LOGIN } from 'constants/api';
import { LOGIN_URL } from 'constants/basic';
import { get, post } from 'assets/js/request';

export function logout() {
    return async () => {
        try {
            await get(ACCOUNT_LOGOUT);
        } catch (e) {
            return;
        }

        location.href = LOGIN_URL;
    };
}

// 登陆页面使用
export function login(params) {
    return post(
        ACCOUNT_LOGIN,
        params,
        {
            // showErrorMsg: false,
            // needLoading: false,
        },
    );
}

