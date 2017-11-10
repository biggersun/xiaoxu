import { sendData } from '../lib/util';
import aircleListModel from '../models/aircle-list';

export default async function (req, res, next) {
    let aircleList;

    try {
        aircleList = await aircleListModel.find();
    } catch (error) {
        next(error);
    }

    console.log(aircleList);
    console.log(req.session);

    sendData(res, 'json', {});
}
