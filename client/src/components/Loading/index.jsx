import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import './index.scss';

const style = {
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

class Loading extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            requestNum: 0,
        };
    }

    add() {
        this.setState({
            requestNum: this.state.requestNum + 1,
        });
    }

    remove() {
        const num = this.state.requestNum;

        this.setState({
            requestNum: num - 1 < 0 ? 0 : num - 1,
        });
    }

    render() {
        const { requestNum } = this.state;

        return (
            <section
                className={classNames('loading-component', { show: requestNum > 0 })}
            >
                <MuiThemeProvider>
                    <RefreshIndicator
                        size={40}
                        left={10}
                        top={0}
                        status="loading"
                        style={style.refresh}
                    />
                </MuiThemeProvider>
            </section>
        );
    }
}

Loading.newInstance = function newLoadingInstance() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    /* eslint-disable react/no-render-return-value */
    const loading = ReactDOM.render(<Loading />, div);
    /* eslint-enable react/no-render-return-value */

    return {
        add() {
            loading.add();
        },

        remove() {
            loading.remove();
        },

        destory() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
};

export default Loading;
