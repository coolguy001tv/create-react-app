/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import './login.scss';

var Login = React.createClass({
    render(){
        return (
            <div className="login-wrapper" >
                <div className="login-div">
                    <h1>登录</h1>
                    <TextField
                        hintText="用户名"
                        errorText=""
                        defaultValue=""
                        fullWidth={true}
                    />
                    <TextField
                        hintText="密码"
                        type="password"
                        fullWidth={true}
                    />
                    <div className="dp-f flex-row remember">
                        <Checkbox
                            label="记住我"
                            style={{
                                width:120,

                            }}
                            iconStyle={{
                                color:'#999',

                            }}
                            labelStyle={{
                                color:'#999'
                            }}
                        />
                        <a href="#" style={{flex:1,textAlign:"right"}}>忘记密码</a>
                    </div>
                    <div className="btn-wrapper">
                        <RaisedButton label="登录" fullWidth={true} backgroundColor="#333333" labelColor="#fff"/>
                    </div>
                    <div className="reg">
                        还没账号？<a href="#">立即注册</a>
                    </div>
                    <Divider/>
                    <div className="third-login">
                        <p>使用社交平台登录</p>
                        <div className="third-login-i-wrapper">
                            <i className="icon icon-qq"></i>
                            <i className="icon icon-weixin"></i>
                        </div>

                    </div>

                </div>

            </div>

        )

    }
});
export default Login;