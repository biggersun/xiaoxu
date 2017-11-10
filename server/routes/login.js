import { MD5, sendData } from '../lib/util';
import userModel from '../models/user';

export default async function (req, res, next) {
    const {
        username,
        password,
    } = req.body;

    let user;
    let errno = 0;
    let msg = '';

    try {
        user = await userModel.find({ username });
    } catch (error) {
        next(error);
    }

    if (user.length === 0) {
        errno = 1;
        msg = '用户名不存在!';
    }

    if (user && user.length > 0 && user[0].password !== MD5(password)) {
        errno = 2;
        msg = '密码错误!';
    }

    if (errno === 0) {
        req.session.user = user;
    }

    sendData(res, 'json', {
        errno,
        msg,
    });
}
