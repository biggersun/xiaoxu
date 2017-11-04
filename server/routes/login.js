import { MD5, sourceData } from '../lib/util';
import userModel from '../models/user';

export default async function (req, res, next) {
    const {
        username,
        password,
    } = req.query;

    let user;
    try {
        user = await userModel.find({ username });
    } catch (error) {
        next(error);
    }

    if (!user) {
        sourceData.errno = 1;
        sourceData.msg = '用户名不存在!';
    }

    if (user[0].password !== MD5(password)) {
        sourceData.errno = 2;
        sourceData.msg = '密码错误!';
    }

    if (sourceData.errno === 0) {
        req.session.user = user;
        res.redirect('/');
    }

    res.json(sourceData);
}
