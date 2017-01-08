/**
 * Created by CoolGuy on 2017/1/8.
 */
import API from '../util/ApiList';
import {ajax,ajaxCommon} from '../util';
import CommonAction from "./CommonAction";
const {
    ajaxStart,
    ajaxFail,
} = CommonAction;
//actions
const LOGIN = "LOGIN";//登录
const REG = "REG";//注册
const LOGIN_FORGET = "LOGIN_FORGET";//忘记密码
//action creators
let loginSuccess = (data) => {
    return {
        type:LOGIN,
        data
    }
};

let regSuccess = (data) => {
    return {
        type:REG,
        data
    }
};

export default {
    LOGIN,
    login :(email,password,rememberPas) => {
        return (dispatch)=>{
            dispatch(ajaxStart());
            let req = API.Login.login;
            return ajax({
                url:req.url,
                method:req.method,
                data:{email,password}
            })
                .done(data =>{
                    if(data && data.result){
                        //将用户信息保存下来
                        if(rememberPas){
                            localStorage['email'] = email;
                            localStorage['password'] = password;
                        }
                        return dispatch(loginSuccess(data.data));
                    }else{
                        //异常情况处理，此处先直接打印错误信息
                        console.error(data);
                    }
                })
                .fail(e=>dispatch(ajaxFail(e)))
        }
    },
    REG,
    reg : (email,password) => {
        return ajaxCommon({
            api:API.Login.register,
            data:{email,password},
            success:regSuccess});
    },
    LOGIN_FORGET,
    loginForget: (email) => {
        return ajaxCommon({
            api:API.Login.forget,
            data:{email},
            success:(data)=>({
                type:LOGIN_FORGET,
                data
            })});
    }
}