import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import './index.scss';

const style = {
    height: 40,
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: '40px',
    textAlign: 'center',
    backgroundColor: '#EEE',
    display: 'inline-block',
};

class Toast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requestNum: 0,
            msg: '',
        };
        this.remove = this.remove.bind(this);
    }

    show(msg, timeout = 1500) {
        this.setState({
            requestNum: this.state.requestNum + 1,
            msg,
        }, () => {
            setTimeout(this.remove, timeout);
        });
    }

    remove() {
        const num = this.state.requestNum;
        this.setState({
            requestNum: num - 1 < 0 ? 0 : num - 1,
        });
    }

    render() {
        const { requestNum, msg } = this.state;

        return (
            <section
                className={classNames('toast-component', { show: requestNum > 0 })}
            >
                <MuiThemeProvider>
                    <Paper style={style} zDepth={1}>
                        {msg}
                    </Paper>
                </MuiThemeProvider>
            </section>
        );
    }
}

Toast.newInstance = function newToastInstance() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    /* eslint-disable react/no-render-return-value */
    const toast = ReactDOM.render(<Toast />, div);
    /* eslint-enable react/no-render-return-value */

    return {
        show(msg, timeout) {
            toast.show(msg, timeout);
        },

        destory() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
};

export default Toast;
