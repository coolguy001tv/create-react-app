/**
 * Created by CoolGuy on 2016/11/27.
 *
 */
//介于注册和登陆页面基本样式一致，所以直接引用
import '../Login/login.scss';
import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
//import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
//import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import NavLink from '../../components/NavLink';

class Reg extends Component{
    getCaptcha(){
        console.log("captcha");
    }
    reg(){

    }
    render(){

        return (
            <div>
                <div className="login-wrapper">
                    <Paper>
                        <div className="login-div">
                            <h1>注册</h1>
                            <TextField
                                hintText="昵称"
                                errorText=""
                                fullWidth={true}
                            />
                            <TextField
                                hintText="手机号(必填)"
                                errorText=""
                                fullWidth={true}
                            />
                            <div className="">
                                <TextField
                                    hintText="验证码(必填)"
                                    errorText=""
                                />
                                <RaisedButton label="获取验证码" style={{verticalAlign:'top'}}  primary={true}
                                              onClick={this.getCaptcha}/>
                            </div>
                            <TextField
                                hintText="设置密码(6-20位字符)"
                                type="password"
                                fullWidth={true}
                            />
                            <TextField
                                hintText="确认密码"
                                type="password"
                                fullWidth={true}
                            />

                            <div className="btn-wrapper">
                                <RaisedButton label="注册" fullWidth={true} primary={true}
                                              onClick={this.reg}/>
                            </div>
                            <div className="reg">
                                已有账号，
                                <NavLink className="link" to="/login">去登录</NavLink>
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
                    </Paper>


                </div>
            </div>

        )

    }
};
export default Reg;