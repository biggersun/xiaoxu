const u = navigator.userAgent;
export const isIOS = /(iphone|ipad|ipod)/gi.test(navigator.appVersion);
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
