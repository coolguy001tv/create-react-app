/**
 * Created by CoolGuy on 2017/1/4.
 */
import {createUuid} from './util'
let initData = (type,input) => {
    let obj = input || {};
    switch(type){
        case 'request':
            return {
                "uuid":obj.uuid,
                "name":"",
                "type":"string",
                "textValue": "",
                "description": ""
            };
        default:
            return {};
    }
};


export const request_method = ["GET","POST","HEAD","PUT","DELETE","TRACE","CONNECT","OPTIONS"];
export const request_protocol = ["HTTP","HTTPS"];
export const data_type = ["FORM_DATA","X_WWW_FORM_URLENCODED","RAW","BINARY"];
export const response_type = ["application/atom+xml","application/x-www-form-urlencoded","application/json","application/octet-stream",
    "application/svg+xml","application/xhtml+xml","application/xml","multipart/form-data","text/html","text/plain",
    "text/xml","*/*","pplication/octet-stream"];

//默认API拥有以下信息
export const defaultApi = {
    apiName:"",
    contentType:response_type[2],
    dataType:data_type[0],
    protocol:request_protocol[0],
    requestMethod:request_method[0],
    respContentType:response_type[2],
    description:"",
    requestURL:"",
    "version":"1.0.0",
};

//默认左侧菜单的信息如下
export let createDefaultLeftMenu = ()=>({
    "id": createUuid(),
    "name": "未分类",
    "type": "folder",
    "children":[]
});

export let supportedType = ["string","number","array","object-array","object","boolean","others"];

export default initData;