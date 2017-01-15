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
export const response_type = [{APPLICATION_ATOM_XML:"application/atom+xml"},
    {APPLICATION_FORM_URLENCODED:"application/x-www-form-urlencoded"},
    {APPLICATION_JSON:"application/json"},
    {APPLICATION_OCTET_STREAM:"application/octet-stream"},
    {APPLICATION_SVG_XML:"application/svg+xml"},
    {APPLICATION_XHTML_XML:"application/xhtml+xml"},
    {APPLICATION_XML:"application/xml"},
    {MULTIPART_FORM_DATA:"multipart/form-data"},
    {TEXT_HTML:"text/html"},
    {TEXT_PLAIN:"text/plain"},
    {TEXT_XML:"text/xml"},
    {WILDCARD:"*/*"},
    {DEFAULT_BINARY:"pplication/octet-stream"}];

//默认API拥有以下信息
export const defaultApi = {
    apiName:"",
    contentType:"APPLICATION_JSON",//response_type[2]的key
    dataType:data_type[0],
    protocol:request_protocol[0],
    requestMethod:request_method[0],
    respContentType:"APPLICATION_JSON",//response_type[2]的key
    description:"",
    requestURL:"",
    "version":"1.0.0",
    //必须赋值undefined，否则会被后端传入的null干扰导致reducer报错
    requestTableArgs:undefined,
    requestJsonArgs:undefined,
    responseTableArgs:undefined,
    responseJsonArgs:undefined
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