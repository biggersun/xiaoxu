import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';

class SnackbarSelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            msg: '',
            timeout: 2000,
        };
    }

    show(msg, timeout = 2000) {
        this.setState({
            open: true,
            msg,
            timeout,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    render() {
        const { timeout, msg } = this.state;
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={msg}
                    autoHideDuration={timeout}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}


SnackbarSelf.newInstance = function newSnackbarSelfInstance() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    /* eslint-disable react/no-render-return-value */
    const SnackbarSelf = ReactDOM.render(<SnackbarSelf />, div);
    /* eslint-enable react/no-render-return-value */

    return {
        show(msg, timeout) {
            SnackbarSelf.show(msg, timeout);
        },

        destory() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
};

export default SnackbarSelf;
