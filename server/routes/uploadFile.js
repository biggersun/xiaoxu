import { sendData } from '../lib/util';

export default async function (req, res, next) {
    const {
        title,
    } = req.body;

    const url = 'asdsdss';

    sendData(res, 'json', {
        url,
    });
}
