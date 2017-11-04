// 渠道来源
const channelKeyInfo = {
    // 页面 url 中的 key，腾讯统计中渠道值标示符为 ADTAG
    entry: 'ADTAG',
    // 上报给后端接口时的 key 值
    output: 'statChannel',
    // 储存在 sessionStorage 中的 key 值
    session: '@stat/app_channel',
};

// 用户行为历史
const actionKeyInfo = {
    output: 'statAction',
    session: '@stat/user_action',
};

const channelQueryReg = new RegExp(`^\\?.*?${channelKeyInfo.entry}=(.*?)(?:&|$)`);

export function init() {
    const matchs = location.search.match(channelQueryReg);

    if (!matchs) {
        return;
    }

    sessionStorage.setItem(channelKeyInfo.session, matchs[1]);
}

// TODO 记录用户行为历史

export function getChannel() {
    const channel = sessionStorage.getItem(channelKeyInfo.session);
    const action = sessionStorage.getItem(actionKeyInfo.session);

    const info = {};

    if (channel) {
        info[channelKeyInfo.output] = decodeURIComponent(channel);
    }

    if (action) {
        info[actionKeyInfo.output] = decodeURIComponent(action);
    }

    return info;
}

