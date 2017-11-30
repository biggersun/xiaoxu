import { sendData } from '../lib/util';

export default async function (req, res, next) {
    // const {} = req.body;

    console.log(req);

    const url = 'asdsdss';

    sendData(res, 'json', {
        url,
    });
}
