import {
    USER_REG,
    USER_LOGIN,
} from '../lib/api';
import {
    PAGE_USER_REG,
    PAGE_USER_LOGIN,
} from '../lib/routes';
import render from '../lib/server/renderPage';

import reg from './reg';
import login from './login';

export default function (app) {
    // app.get('/', (req, res) => {
    //     render('index', { title: '首页' })(res);
    // });
    app.get(PAGE_USER_REG, (req, res) => {
        render('reg', { title: '注册' })(res);
    });
    app.get(PAGE_USER_LOGIN, (req, res) => {
        render('login', { title: '登录' })(res);
    });
    app.post(USER_REG, reg);
    app.post(USER_LOGIN, login);
    // app.post('/post', (req, res) => {
    // });
    // app.get('/post', (req, res) => {
    //     render('post', { title: '发表' })(res);
    // });
    // app.get('/logout', (req, res) => {
    //     render('logout', { title: '发表' })(res);
    // });
}

