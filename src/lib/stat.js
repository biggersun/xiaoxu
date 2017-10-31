// 腾讯统计代码
// http://mta.qq.com/h5/manage/ctr_app_manage?app_id=500409902

/* eslint no-underscore-dangle: 'off' */
const onlineDomain = 'www.sunxiaoxu.com';

// 开发和测试环境不要污染线上统计
if (location.hostname === onlineDomain) {
    global._mtac = { senseHash: 0 };

    const mta = document.createElement('script');

    mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4';
    mta.setAttribute('name', 'MTAH5');
    mta.setAttribute('sid', '');
    mta.setAttribute('cid', '');

    document.body.appendChild(mta);
}
