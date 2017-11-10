import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PageRoute from './route';

import './index.scss';

const propTypes = {
    // user: PropTypes.object.isRequired,
};

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

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
