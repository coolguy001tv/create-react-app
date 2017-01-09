/**
 * Created by CoolGuy on 2017/1/1.
 * 协议文档参考：http://192.168.1.100:8080/swagger-ui.html
 * http://121.40.214.161:8080/
 */
const ENV = 'dev';
const URL_PREFIX = ENV === "dev"? "http://192.168.1.100:8080" : "http://121.40.214.161:8080";

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
    },
    forget:{
        url:URL_PREFIX+"/v1/user/account/forget",
        method:"post"
    }
};

let Api = {
    add:{
        url:URL_PREFIX+"/v1/workbench/api/add",
        method:"post"
    },
    "get":(apiId)=>({
        url:`${URL_PREFIX}/v1/workbench/api/${apiId}`,
        method:"get"
    }),
    delete:(apiId)=>({
        url:`${URL_PREFIX}/v1/workbench/api/${apiId}/delete`,
        method:"post"
    }),
    edit:(apiId)=>({
        url:`${URL_PREFIX}/v1/workbench/api/${apiId}/edit`,
        method:"post"
    }),

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
    },
    edit:(projectId)=>({
        url:`${URL_PREFIX}/v1/workbench/project/${projectId}/edit`,
        method:"post"
    }),
    "delete":(projectId)=>({
        url:`${URL_PREFIX}/v1/workbench/project/${projectId}/delete`,
        method:"post"
    }),
    "search":(projectId)=>({
        url:`${URL_PREFIX}/v1/workbench/project/${projectId}/search`,
        method:"post"
    }),

};

let Folder = {
    add: (projectId)=>({
        url:`${URL_PREFIX}/v1/workbench/folder/${projectId}/add`,
        method:"post"
    }),
    adjust:(projectId)=>({
        url:`${URL_PREFIX}/v1/workbench/folder/${projectId}/adjust`,
        method:"post"
    }),
    "list":(projectId)=>({
        url:`${URL_PREFIX}/v1/workbench/folder/${projectId}/list`,
        method:"get"
    }),
    "delete":(projectId,folderId)=>({
        url:`${URL_PREFIX}/v1/workbench/folder/${projectId}/${folderId}/delete`,
        method:"post"
    }),
    edit:(projectId,folderId)=>({
        url:`${URL_PREFIX}/v1/workbench/folder/${projectId}/${folderId}/edit`,
        method:"post"
    })
};

let UserSetting = {
    account:{
        url:URL_PREFIX+"/v1/user/setting/account",
        method:"get"
    },
    info:{
        url:URL_PREFIX+"/v1/user/setting/info",
        method:"get"
    },
    infoEdit:{
        url:URL_PREFIX+"/v1/user/setting/info/edit",
        method:"post"
    }
}

export default {
    User,
    Login,
    Api,
    Project,
    Folder,
    UserSetting,
}