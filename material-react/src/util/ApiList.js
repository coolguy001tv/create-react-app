/**
 * Created by CoolGuy on 2017/1/1.
 * 协议文档参考：http://192.168.1.100:8080/swagger-ui.html
 */
const URL_PREFIX = "http://192.168.1.100:8080";

let User = {

};
let Login = {
    register:{
        url:URL_PREFIX+"/v1/user/account/register",
        method:"post"
    },
    login:{
        url:URL_PREFIX+"/v1/user/account/login",
        method:"post"
    },
    logout:{
        url:URL_PREFIX+"/v1/user/account/logout",
        method:"post"
    }
};

let Api = {
    add:{
        url:URL_PREFIX+"/v1/workbench/api/add",
        method:"post"
    },
    "get":{
        url:URL_PREFIX+"/v1/workbench/api",
        method:"get"
    }

};
let Project = {
    add:{
        url:URL_PREFIX+"/v1/workbench/project/add",
        method:"post"
    },
    //获取列表
    "list":{
        url:URL_PREFIX+"/v1/workbench/project/list",
        method:"get"
    }

};

export default {
    User,
    Login,
    Api,
    Project
}