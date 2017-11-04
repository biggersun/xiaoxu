import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import * as router from 'constants/router';

import App from 'containers/App';

export default function RouteTree({ store, indexPath, history }) {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Redirect exact from={router.ROOT_PATH} to={indexPath} />
                    <Route path={router.ROOT_PATH} component={App} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}
