/**
 * Created by CoolGuy on 2016/11/27.
 *
 */
//介于注册和登陆页面基本样式一致，所以直接引用
import '../Login/login.scss';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
//import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
//import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import NavLink from '../../components/NavLink';
import Snackbar from 'material-ui/Snackbar';


//import Action from '../../actions';
import AjaxAction from '../../actions/AjaxAction';

class Reg extends Component{
    state={
        errorTip:'',
        open:false,
    };
    getCaptcha(){
        console.log("captcha");
    }
    listenEnter = (event)=>{
        if(13 === event.charCode){
            this.reg();
        }
    };
    reg=()=>{
        let {dispatch,router} = this.props;
        let {email,password} = this.refs;
        //todo: 后期加入验证条件的判断
        dispatch(AjaxAction.reg(email.input.value,password.input.value)).then((data)=>{
            if(data.result){
                router.push('/dashboard');
            }else{
                this.setState({
                    errorTip:data.msg,
                    open:true
                })
            }
        });
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    render(){

        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.errorTip}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
                <div className="login-wrapper" onKeyPress={this.listenEnter}>
                    <Paper>
                        <div className="login-div">
                            <h1>注册</h1>
                            {/*<TextField
                                hintText="昵称"
                                errorText=""
                                fullWidth={true}
                            />*/}
                            <TextField
                                hintText="邮箱"
                                errorText=""
                                ref="email"
                                fullWidth={true}
                            />
                            {/*<div className="">
                                <TextField
                                    hintText="验证码(必填)"
                                    errorText=""
                                />
                                <RaisedButton label="获取验证码" style={{verticalAlign:'top'}}  primary={true}
                                              onClick={this.getCaptcha}/>
                            </div>*/}
                            <TextField
                                hintText="设置密码(6-20位字符)"
                                type="password"
                                ref="password"
                                fullWidth={true}
                            />
                            {/*<TextField
                                hintText="确认密码"
                                type="password"
                                fullWidth={true}
                            />*/}

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
export default connect((state)=>({state:state}))(Reg);