export const regPhone = /^(1)\d{10}$/;
export const regYzm = /^\d{6}$/;
export const regCount = /^\+?[1-9]\d*$/;
export const regNumber = /^(\d+|\d+\.\d+|\.\d+)$/;
export const regInteger = /^[0-9]*$/;
export const regNumberAndWord = /^[0-9a-zA-Z]+$/;
export const regNumberFix = /(\.00)$/;
export const regPassword = /^(\w){6,20}$/;

// export const DPR = window.devicePixelRatio;

// 修复 location.reload 在某些 Android 下无效的问题
export function refreshPage() {
    const connector = location.href.includes('?') ? '&' : '?';

    location.href += `${connector}timestamp=${(new Date()).getTime()}`;
}

export function fixNumber(num) {
    const n = num.toFixed(2);
    if (regNumberFix.test(n)) {
        return n.slice(0, -3);
    }
    return n;
}

export function fixPhoneNumber(phoneNumber) {
    const p = phoneNumber.split('');
    p.splice(3, 0, '-');
    p.splice(8, 0, '-');
    return p.join('');
}

export function fixBarCode(code) {
    const c = code.split('');
    for (let i = 4; i < 20; i += 5) {
        c.splice(i, 0, '  ');
    }
    return c.join('');
}
