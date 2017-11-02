import userModel from '../models/user';
import { regNumberAndWord, regPassword } from '../lib/util';

async function reg(req, res, next) {
    const {
        username,
        password,
    } = req.query;

    let errno = 0;
    /**
     * 1: 用户名被占用
     * 2: 用户名不能为空，或含有特殊字符
     * 3: 只能输入6-20个字母、数字、下划线
    */

    let msg = '注册成功';

    if (!regNumberAndWord.test(username) || !username) {
        errno = 2;
        msg = '用户名不能为空，或含有特殊字符';
    }

    if (!regPassword.test(password)) {
        errno = 3;
        msg = '只能输入6-20个字母、数字、下划线';
    }

    await userModel.find({ username }).exec((err, user) => {
        if (user.length !== 0) {
            // req.flash('error', '用户名已被占用!');
            errno = 1;
            msg = '用户名已被占用!';
        }
    });

    if (errno === 0) {
        await userModel.create({ username, password }, (err) => {
            if (err) next();
        });
    }
    res.json({
        errno,
        msg,
    });
}

export default reg;
