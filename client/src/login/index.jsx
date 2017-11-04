import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

function render() {
    ReactDOM.render(
        module.hot ? <AppContainer><App /></AppContainer> : <App />,
        document.getElementById('app-container'),
    );
}

render();

if (module.hot) {
    module.hot.accept('./app', render);
}

