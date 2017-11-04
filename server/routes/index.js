import {
    USER_REG,
    USER_LOGIN,
} from '../lib/api';
import {
    PAGE_USER_REG,
    PAGE_USER_LOGIN,
    USER_INDEX,
} from '../lib/routes';

import reg from './reg';
import login from './login';

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        res.redirect(PAGE_USER_LOGIN);
    }
    next();
}

export default function (app) {
    app.get('page/user/*', checkLogin);

    // app.get('/', (req, res) => {
    //     render('index', { title: '首页' })(res);
    // });

    app.get(PAGE_USER_REG, (req, res) => {
        res.json({});
    });

    app.get(PAGE_USER_LOGIN, (req, res) => {
        res.json({});
    });
    app.post(USER_REG, reg);
    app.post(USER_LOGIN, login);

    app.get(USER_INDEX, (req, res) => {});

    // app.post('/post', (req, res) => {
    // });
    // app.get('/post', (req, res) => {
    //     render('post', { title: '发表' })(res);
    // });
    // app.get('/logout', (req, res) => {
    //     render('logout', { title: '发表' })(res);
    // });
}

