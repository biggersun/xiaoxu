import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { logout } from 'actions/user';
import PageRoute from './route';

import './index.scss';

const propTypes = {
    user: PropTypes.object.isRequired,
};

class App extends PureComponent {
    render() {
        return (
            <section className="app-container">
                <PageRoute />
            </section>
        );
    }
}

App.propTypes = propTypes;

export default App;
