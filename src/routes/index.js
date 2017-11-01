import {
    USER_REG,
    USER_LOGIN,
} from '../lib/api';
import {
    PAGE_USER_REG,
    PAGE_USER_LOGIN,
} from '../lib/routes';
import render from '../lib/server/renderPage';


export default function (app) {
    console.log(PAGE_USER_LOGIN);
    app.get('/', (req, res) => {
        res.render('index', { title: 'Express' });
    });
    app.get(PAGE_USER_REG, (req, res) => {
        res.render('reg', { title: '注册' });
    });
    app.post(USER_REG, (req, res) => {
    });
    app.get(PAGE_USER_LOGIN, (req, res) => {
        render('login', { title: '登录' });
    });
    app.post(USER_LOGIN, (req, res) => {
    });
    app.get('/post', (req, res) => {
        res.render('post', { title: '发表' });
    });
    app.post('/post', (req, res) => {
    });
    app.get('/logout', (req, res) => {
    });
}

