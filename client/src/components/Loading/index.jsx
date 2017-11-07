import React from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './index.scss';

const style = {
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

const defaultProps = {
    status: 'hide',
};

const propTypes = {
    status: PropTypes.string.isRequired,
};

const Loading = (props) => {
    const { status } = props;
    return (
        <div className="loading">
            <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status={status}
                style={style.refresh}
            />
        </div>
    );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
