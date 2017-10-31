import mongodb from 'mongodb';
import settings from '../settings';

const {
    Db,
    Server,
} = mongodb;

export default new Db(
    settings.db,
    new Server(settings.host, settings.port),
    { safe: true },
);
