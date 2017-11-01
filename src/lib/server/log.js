import debug from 'debug';
import util from 'util';
import Moment from 'moment';
import fs from 'mz/fs';
import { resolve } from 'path';
import { logsDir, isDev } from '../../config/env';

async function log(...args) {
    try {
        await fs.access(logsDir, fs.constants.F_OK);
    } catch (e) {
        await fs.mkdir(logsDir);
    }

    const current = new Moment();
    const filename = `error.log.${current.format('YYYYMMDD')}`;
    const logPath = resolve(logsDir, filename);

    await fs.appendFile(logPath, `${util.format(...args)}\n`);
}

// eslint-disable-next-line no-console
debug.log = isDev ? console.log.bind(console) : log;

export default debug;
