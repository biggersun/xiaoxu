import nunjucks from 'nunjucks';
import { projectDir, isDev } from '../../../config/env';

nunjucks.configure(projectDir, {
    noCache: isDev,
});

export default function render(page, data) {
    return (res) => {
        res.send(nunjucks.render(`views/${page}/index.njk`, data));
    };
}

