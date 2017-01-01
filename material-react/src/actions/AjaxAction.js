/**
 * Created by CoolGuy on 2016/11/29.
 */
import API from '../util/ApiList';
import {ajax} from '../util';
//actions
const LOGIN = "LOGIN";//登录
const REG = "REG";//注册
const AJAX_START = "AJAX_START";//通用ajax开始
const AJAX_FAIL = "AJAX_FAIL";//通用ajax失败
const AJAX_LOADING_START = "AJAX_LOADING_START";//通用的带加载的ajax开始

let ajaxStart = ()=>{
    //考虑获取ajax前的处理
    return {
        type:AJAX_START
    }
};
let ajaxFail = (data)=>{
    return {
        type:AJAX_FAIL,
        data
    }
};
let ajaxLoadingStart=(data)=>{
    return {
        type: AJAX_LOADING_START,
        data
    }
};

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
    AJAX_START,
    ajaxStart,
    ajaxLoadingStart,
    AJAX_FAIL,
    LOGIN,
    login :(username,password,rememberPas) => {
        return (dispatch)=>{
            dispatch(ajaxStart());
            return ajax(`http://localhost/user.php`,{username,password,rememberPas})
                .done(json =>
                    dispatch(loginSuccess(json))
                )
                .fail(e=>dispatch(ajaxFail(e)))
        }
    },
    REG,
    reg :(email,password) => {
        return (dispath) => {
            dispath(ajaxStart());
            return ajax({
                    url:API.Login.register.url,
                    method:API.Login.register.method,
                    data:{email,password}
                })
                .done((data)=>{
                    if(data && data.result){
                        return dispath(regSuccess(data.data))
                    }else{
                        //异常情况处理，此处先直接打印错误信息
                        console.error(data);
                    }

                })
                .fail(e=>dispath(ajaxFail(e)))
        }
    }
}
