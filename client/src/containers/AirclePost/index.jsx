import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import './index.scss';

const propTypes = {
};

const style = {
    marginLeft: 20,
};

class AirclePost extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Paper zDepth={2}>
                <TextField hintText="标题" style={style} />
                <br />
                <TextField hintText="简述" style={style} />
                <br />
                <TextField hintText="标签" style={style} />
                <br />
                <TextField hintText="markdown" style={style} />
            </Paper>
        );
    }
}

AirclePost.propTypes = propTypes;

export default AirclePost;
