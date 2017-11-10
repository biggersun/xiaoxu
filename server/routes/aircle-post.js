import { sendData } from '../lib/util';
import aircleListModel from '../models/aircle-list';

export default async function (req, res, next) {
    const {
        title,
        description,
        author,
        publishTime,
        url,
        chip,
    } = req.body;

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

    sendData(res, 'json');
}
