import multer from 'multer';
import {
    USER_REG,
    USER_LOGIN,
    AIRCLE_LIST,
    AIRCLE_POST,
    COMMON_UPLOAD,
} from '../lib/api';

import reg from './reg';
import login from './login';
import aircleList from './aircle-list';
import airclePost from './aircle-post';
import uploadFile from './uploadFile';

const upload = multer({ dest: 'uploads/' });

export default function (app) {
    app.post(USER_REG, reg);
    app.post(USER_LOGIN, login);
    app.get(AIRCLE_LIST, aircleList);
    app.post(AIRCLE_POST, airclePost);
    app.post(COMMON_UPLOAD, upload.single('markdown'), uploadFile);
    // app.post('/post', (req, res) => {
    // });
    // app.get('/post', (req, res) => {
    //     render('post', { title: '发表' })(res);
    // });
    // app.get('/logout', (req, res) => {
    //     render('logout', { title: '发表' })(res);
    // });
}
