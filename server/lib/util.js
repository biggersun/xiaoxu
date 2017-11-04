// crypto node hash 核心模块
// import crypto from 'crypto';

export const regPhone = /^(1)\d{10}$/;
export const regYzm = /^\d{6}$/;
export const regCount = /^\+?[1-9]\d*$/;
export const regNumber = /^(\d+|\d+\.\d+|\.\d+)$/;
export const regInteger = /^[0-9]*$/;
export const regNumberAndWord = /^[0-9a-zA-Z]+$/;
export const regNumberFix = /(\.00)$/;
export const regPassword = /^(\w){6,20}$/;

// data 每个接口返回的源数据
export const sourceData = {
    errno: 0,
    msg: 'success',
};

export function MD5(str) {
    return str;
    // 为什么用明文密码，是因为还不准备做找回密码的功能  ，而且如果为安全考虑最好不要用MD5 可以用 bcrypt
    // 也可用 MD5 加随机盐的方式，把盐和 hash 结果一起存起来
    // 关于密码的安全性多说几句，前端的加密不管是用的什么花哨的算法都等于密码明文。所以并不能相信前端加密
    // return crypto.createHash('md5').update(str).digest('hex');
}


// export const DPR = window.devicePixelRatio;

// 修复 location.reload 在某些 Android 下无效的问题
export function refreshPage() {
    const connector = location.href.includes('?') ? '&' : '?';

    location.href += `${connector}timestamp=${(new Date()).getTime()}`;
}

