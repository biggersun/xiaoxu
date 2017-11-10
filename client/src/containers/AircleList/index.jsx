import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from 'actions/aircleList';

import './index.scss';

const propTypes = {
    fetchAircleList: PropTypes.func,
};

class AircleList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { fetchAircleList } = this.props;
        fetchAircleList();
    }

    render() {
        return (
            <section>
                AircleList
            </section>
        );
    }
}

AircleList.propTypes = propTypes;

const mapStateToProps = (state, { location }) => {
    console.log(state);
    return {};
};

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(AircleList);
