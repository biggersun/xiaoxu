import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createHistory from 'history/createBrowserHistory';
import { LOGIN_URL } from 'constants/basic';
import RouteTree from './router';
import initializeState from './initState';
import createStore from './store';

import './config';
import './index.scss';

const history = createHistory();

export default class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            initState: null,
            store: null,
        };
    }

    componentDidMount() {
        this.initializeState();
    }

    async initializeState() {
        let initState;

        try {
            initState = await initializeState();
        } catch (e) {
            location.href = LOGIN_URL;
            return;
        }

        if (!initState) {
            return;
        }

        const store = createStore(initState, history);

        this.setState({ initState, store });
    }

    render() {
        const { initState, store } = this.state;

        if (!initState || !store) {
            return <div>loading</div>;
        }

        return (
            <MuiThemeProvider>
                <RouteTree store={store} history={history} indexPath="/aircle-list" />
            </MuiThemeProvider>
        );
    }
}
