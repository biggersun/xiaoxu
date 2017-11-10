import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { regUserName, regPassword } from 'assets/js/util';
import { login, reg } from 'actions/user';
import { APP_URL } from 'constants/basic';

import './index.scss';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputList: [
                {
                    type: 'username',
                    name: '用户名',
                    value: '',
                    msg: '',
                    msgErr: '用户名不能为空，或者不能含有特殊字符！',
                    reg: regUserName,
                },
                {
                    type: 'password',
                    name: '密码',
                    value: '',
                    msg: '',
                    msgErr: '请输入正确的密码！',
                    reg: regPassword,
                },
            ],
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmint = this.handleSubmint.bind(this);
    }

    handleInput(e, type) {
        const { value } = e.target;
        const { inputList } = this.state;

        const newInputList = inputList.map((item) => {
            let newValue = item.value;

            if (item.type === type) {
                newValue = value;
            }
            return {
                ...item,
                value: newValue,
            };
        });

        this.setState({
            inputList: newInputList,
        });
    }

    async handleSubmint(type) {
        const { inputList } = this.state;

        let errno = 0;
        const params = {};
        const newInputList = inputList.map((item) => {
            let msg = '';
            if (!item.reg.test(item.value)) {
                msg = item.msgErr;
                errno = 1;
            }
            params[item.type] = item.value;
            return {
                ...item,
                msg,
            };
        });

        this.setState({
            inputList: newInputList,
        });

        if (errno === 0) {
            try {
                if (type === 1) {
                    await login(params);
                } else {
                    await reg(params);
                }
            } catch (error) {
                // no-catch
                return;
            }
            location.href = APP_URL;
        }
    }

    render() {
        const {
            inputList,
        } = this.state;

        return (
            <MuiThemeProvider>
                <section className="login-page">
                    {inputList.map((item) => {
                        const { name, type, msg } = item;
                        return (
                            <TextField
                                key={type}
                                hintText={`请输入${name}`}
                                errorText={msg}
                                floatingLabelText={name}
                                type={type}
                                onChange={(e) => { this.handleInput(e, type); }}
                            />
                        );
                    })
                    }
                    <div className="submit-btn-container">
                        <RaisedButton
                            label="登录"
                            primary
                            onClick={() => this.handleSubmint(1)}
                        />
                        <RaisedButton
                            label="注册"
                            primary
                            onClick={() => this.handleSubmint(2)}
                        />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export default Login;

