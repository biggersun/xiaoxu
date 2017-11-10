import {
    USER_REG,
    USER_LOGIN,
    AIRCLE_LIST,
    AIRCLE_POST,
} from '../lib/api';

import reg from './reg';
import login from './login';
import aircleList from './aircle-list';
import airclePost from './aircle-post';

export default function (app) {
    app.post(USER_REG, reg);
    app.post(USER_LOGIN, login);
    app.get(AIRCLE_LIST, aircleList);
    app.post(AIRCLE_POST, airclePost);
    // app.post('/post', (req, res) => {
    // });
    // app.get('/post', (req, res) => {
    //     render('post', { title: '发表' })(res);
    // });
    // app.get('/logout', (req, res) => {
    //     render('logout', { title: '发表' })(res);
    // });
}
