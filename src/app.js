import logger from 'morgan';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import connectMongo from 'connect-mongo';
import nunjucks from 'nunjucks';

import { isDev } from '../config/env';

import routes from './routes/index';
import settings from './settings';

const MongoStore = connectMongo(session);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// nunjucks.configure('views', {
//     noCache: isDev,
//     express: app,
// });
// app.set('view engine', 'nunjucks');

// flash
app.use(flash());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// session
const mongoUrl = `mongodb://${settings.host}/${settings.db}`;

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: settings.cookieSecret,
    key: settings.db, // cookie name
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // 30 days
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port,
        url: mongoUrl,
    }),
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;

