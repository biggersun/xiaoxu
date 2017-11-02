import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import settings from '../settings';

const MongoStore = connectMongo(session);

mongoose.Promise = global.Promise;

const mongoUrl = `mongodb://${settings.host}/${settings.db}`;
global.db = mongoose.createConnection(mongoUrl);

function sessionApp(app) {
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: settings.cookieSecret,
        key: settings.db, // cookie name
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // 30 days
        store: new MongoStore({ mongooseConnection: db }),
    }));
}

export default sessionApp;
