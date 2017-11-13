import moment from 'moment';
import { sendData } from '../lib/util';
import aircleListModel from '../models/aircle-list';

export default async function (req, res, next) {
    const {
        title,
        description,
        url,
        chip,
    } = req.body;

    const { user } = req.session;

    let errno = 0;
    let msg = '';

    const author = req.body.author || (user ? user.username : '');

    if (!author) {
        errno = 2;
        msg = '请登录重试';
    }

    if (!title || !description || !url) {
        errno = 1;
        msg = '请填写完整信息';
    }

    const publishTime = moment().unix();

    if (errno === 0) {
        await aircleListModel.create({
            title,
            description,
            author,
            publishTime,
            url,
            chip,
        }, (err) => {
            if (err) next(err);
        });
    }

    sendData(res, 'json', {
        errno,
        msg,
    });
}
