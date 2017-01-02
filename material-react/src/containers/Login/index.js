/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
//import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import NavLink from '../../components/NavLink';
import Snackbar from 'material-ui/Snackbar';
import './login.scss';

//import action from '../../actions';
import AjaxAction from '../../actions/AjaxAction';

import {connect} from 'react-redux';

class Login extends Component {
    state={
        checked:true,
        errorTip:'',
        open:false,
    };
    componentDidMount(){

    }
    listenEnter = (event)=>{
      if(13 === event.charCode){
          this.login();
      }
    };
    login = ()=>{
        let {email,password} = this.refs;
        let {dispatch,router} = this.props;
        dispatch(AjaxAction.login(email.input.value,password.input.value,this.state.checked)).then((data)=>{
           if(data.result){
               router.push('/dashboard');
           } else{
               this.setState({
                   errorTip:data.msg,
                   open:true
               })
           }
        });

    };
    handleCheck = (obj,checked)=>{
        this.setState({
            checked
        })
    };
    render() {
        let {user} = this.props;
        let {email,password} = user;
        if(!email){
            if(localStorage['email']){
                email = localStorage['email'];
                password = localStorage['password'];
            }
        }
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
                            <h1>登录</h1>
                            <TextField
                                hintText="邮箱"
                                errorText=""
                                defaultValue={email}

                                fullWidth={true}
                                ref="email"
                            />
                            <TextField
                                hintText="密码"
                                type="password"
                                defaultValue={password}
                                fullWidth={true}
                                ref="password"
                            />
                            <div className="dp-f flex-row remember">
                                <Checkbox
                                    label="记住我"
                                    checked={this.state.checked}
                                    onCheck={this.handleCheck}
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
                                <a href="#" className="link" style={{flex:1,textAlign:"right"}}>忘记密码</a>
                            </div>
                            <div className="btn-wrapper">
                                <RaisedButton label="登录" fullWidth={true} primary={true}
                                              onClick={this.login}/>
                            </div>
                            <div className="reg">
                                还没账号？
                                <NavLink  className="link" to="/reg">立即注册</NavLink>
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

}
export default connect((state)=>{
    return {
        user:state.user
    }
})(Login);