/**
 * Created by CoolGuy on 2016/11/29.
 */
import API from '../util/ApiList';
import {ajax,ajaxCommon} from '../util';
//actions
const LOGIN = "LOGIN";//登录
const REG = "REG";//注册
const PROJECT_ADD = "PROJECT_ADD";//新增一个项目
const PROJECT_EDIT = "PROJECT_EDIT";//设置一个项目
const PROJECT_LIST = "PROJECT_LIST";//获取项目列表
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

let projectAddSuccess = (data) => {
    return {
        type: PROJECT_ADD,
        data
    }
};
let projectListSuccess = (data) => {
    return {
        type: PROJECT_LIST,
        data
    }
};
let projectEditSuccess = (data) => {
    return {
        type: PROJECT_EDIT,
        data
    }
}
export default {
    AJAX_START,
    ajaxStart,
    ajaxFail,
    ajaxLoadingStart,
    AJAX_FAIL,
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
    PROJECT_LIST,
    projectList : () => {
        return ajaxCommon({api:API.Project.list,success:projectListSuccess});
    },
    PROJECT_ADD,
    //todo: 暂时不支持ICON上传
    projectAdd : (projectName,description)=>{
        return ajaxCommon({api:API.Project.add,data:{projectName,description},success:projectAddSuccess});
    },
    //todo: 暂时不支持ICON上传
    PROJECT_EDIT,
    projectEdit : (projectId,projectName,description)=>{
        let api = API.Project.edit;
        api.url = api.url.replace("{projectId}",projectId);
        return ajaxCommon({
            api:api,
            data:{projectName,description},
            success:projectEditSuccess});
    },
}
