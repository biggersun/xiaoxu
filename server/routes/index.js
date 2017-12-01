import multer from 'multer';
import path from 'path';
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

const upload = multer({ dest: path.join(__dirname, '../public/static') });

export default function (app) {
    app.post(USER_REG, reg);
    app.post(USER_LOGIN, login);
    app.get(AIRCLE_LIST, aircleList);
    app.post(AIRCLE_POST, airclePost);
    app.post(COMMON_UPLOAD, upload.single('markdown'), uploadFile);
    app.post('/post', (req, res) => {
    });
    app.get('/logout', (req, res) => {
    });
}
