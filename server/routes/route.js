function routes() {
    const data = {
        errno: 0,
        msg: '',
    };

    return (cb) => {
        cb.data = data; // eslint-disable-line
        console.log(cb);
        return cb;
    };
}

export default routes;
