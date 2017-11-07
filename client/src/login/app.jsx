import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from 'components/Loading';
import { regUserName, regPassword } from 'assets/js/util';
import { login } from 'actions/user';

import './index.scss';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            msg1: '',
            msg2: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmint = this.handleSubmint.bind(this);
    }

    handleInput(e, type) {
        const { value } = e.target;

        this.setState({
            [type]: value,
        });
    }

    async handleSubmint() {
        const { username, password } = this.state;
        if (!regUserName.test(username)) {
            this.setState({
                msg1: '用户名不能为空，或含有特殊字符',
            });
            return;
        }
        if (!regPassword.test(password)) {
            this.setState({
                msg1: '用户名不能为空，或含有特殊字符',
            });
            return;
        }

        console.log({
            username,
            password,
        });

        await login({
            username,
            password,
        });
    }

    render() {
        const { msg1, msg2 } = this.state;
        return (
            <MuiThemeProvider>
                <section className="login-page">
                    <TextField
                        hintText="请输入用户名"
                        errorText={msg1}
                        floatingLabelText="用户名"
                        onChange={(e) => { this.handleInput(e, 'username'); }}
                    />
                    <TextField
                        hintText="请输入密码"
                        errorText={msg2}
                        floatingLabelText="密码"
                        type="password"
                        onChange={(e) => { this.handleInput(e, 'password'); }}
                    />
                    <div className="submit-btn-container">
                        <RaisedButton
                            label="登录"
                            primary
                            onClick={this.handleSubmint}
                        />
                        <RaisedButton label="注册" primary />
                    </div>
                </section>
                <Loading />
            </MuiThemeProvider>
        );
    }
}

export default Login;
