export default function (app) {
    app.get('/', (req, res) => {
        res.render('index', { title: 'Express' });
    });
    app.get('/user', (req, res) => {
        res.render('index', { title: 'Express' });
    });
}

