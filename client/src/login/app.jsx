import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { regUserName, regPassword } from 'assets/js/util';
import { login } from 'actions/user';

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
                    msgErr: '请输入密码！',
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
            let newValue = '';
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

    async handleSubmint() {
        const { inputList } = this.state;

        let errno = 0;
        let params = {};
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

        console.log(params);
        if (errno === 0) {
            await login(params);
        }
    }

    render() {
        const {
            msg1,
            msg2,
            inputList,
        } = this.state;

        return (
            <MuiThemeProvider>
                <section className="login-page">
                    {inputList.map((item) => {
                        const { name, type, msg } = item;
                        return (
                            <TextField
                                hintText={`请输入${name}`}
                                errorText={msg}
                                floatingLabelText={name}
                                onChange={(e) => { this.handleInput(e, type); }}
                            />
                        );
                    })
                    }
                    <div className="submit-btn-container">
                        <RaisedButton
                            label="登录"
                            primary
                            onClick={this.handleSubmint}
                        />
                        <RaisedButton label="注册" primary />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export default Login;

