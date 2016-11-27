/**
 * Created by CoolGuy on 2016/11/27.
 */
//actions
const LOGIN = "LOGIN";//登录
const REG = "REG";//注册
const AJAX_START = "AJAX_START";//通用ajax开始
const AJAX_FAIL = "AJAX_FAIL";//通用ajax失败



//action creators
let login = (username,password,rememberPas) => {
    return (dispatch)=>{
        dispatch(AJAX_START);
        return fetch(`user.json`,{username,password,rememberPas})
            .then(response => response.json())
            .then(json =>
                dispatch(LOGIN,json)
            )
    }
};

let reg = () => {

};

export default{
    AJAX_START,
    AJAX_FAIL,
    LOGIN,
    login,
    REG,
    reg,
}
