/**
 * Created by CoolGuy on 2016/11/29.
 */
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

let ajaxLoadingStart=(data)=>{
    return {
        type: AJAX_LOADING_START,
        data
    }
}

//action creators
let loginSuccess = (data) => {
    return {
        type:LOGIN,
        data
    }
}

let reg = () => {

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
            return fetch(`http://localhost/user.php`,{username,password,rememberPas})
                .then(response => response.json())
                .then(json =>
                    dispatch(loginSuccess(json))
                )
        }
    },
    REG,
    reg,
}
