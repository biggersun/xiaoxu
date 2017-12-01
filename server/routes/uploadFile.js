import fs from 'fs';
import { sendData } from '../lib/util';
import { host, port } from '../lib/config';

export default async function (req, res) {
    const { path, originalname, filename } = req.file;

    const suffix = originalname.slice(originalname.indexOf('.'));
    const tmpPath = path;
    const targetPath = `server/public/static/${filename}${suffix}`;

    const src = fs.createReadStream(tmpPath);
    const dest = fs.createWriteStream(targetPath);

    src.pipe(dest);

    sendData(res, 'json', {
        imageUrl: `${host}:${port}/static/${filename}${suffix}`,
    });
}
