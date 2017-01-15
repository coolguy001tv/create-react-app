/**
 * Created by CoolGuy on 2016/12/31.
 */

export default {
    user: {
    },
    globalError:{
        msg:"",
    },
    theme: 'default',
    projectList:[],
    currentMenu:/*[
        {
            "id": "abcdefas",
            "name": "1用户管理",
            "type": "folder",
            "children": [
                {
                    "id": 14,
                    "method": "post",
                    "name": "1.1获取用户列表",
                    "type": "file"
                }
            ]
        },
        {
            "id": 12,
            "name": "2统计管理",
            "type": "folder"
        },
        {
            "name": "3项目管理",
            "id": 13,
            "type": "folder",
            "children": [
                {
                    "id": 14,
                    "name": "获取用户列表",
                    "method": "post",
                    "type": "file"
                },
                {
                    "name": "获取用户列表",
                    "id": 15,
                    "method": "get",
                    "type": "file"
                }
            ]
        }
    ]*/undefined,
    showApi:false,//是否应该展示右边的API详情
    currentApiId:null,//当前正在编辑/新增的APIID
    currentApi:{
        //"apiName": "",
        //"contentType": "application/json",
        //"dataType": "FORM_DATA",
        //"protocol": "HTTP",
        //"requestMethod": "GET",
        //"respContentType": "application/json",
        //"description": "",
        //"requestURL": "",
        //"version": "1.0.0",
        //request和response都必须有uuid
        requestTableArgs:/*[{
            "require": false,
            "children": [{
                "require": true,
                "type": "string",
                "children": [],
                "name": "hello",
                "textValue": "这里有只",
                "uuid":"234234234324",
            }, {
                "require": true,
                "type": "object",
                "children": [{"require": true, "type": "object", "children": [
                    {"name":"第四季","uuid":"123fscxsdf",}
                ], "name": "a","uuid":"1234asz2", "textValue": "a"}],
                "name": "test",
                "uuid":"124234sdf",
                "textValue": ""
            },{

                "name":"second",
                "uuid":"3487658768",
                "textValue":"s",
                "type":"string"
            }],
            "type": "object",
            "name": "data",
            "uuid":"f213423a234234",
            "textValue": "",
            "description": "我的"
        }, {"require": false, "children": [], "type": "string", "name": "12345","uuid":"1234546", "textValue": ""}, {
            "require": false,
            "children": [],
            "type": "string",
            "name": "test",
            "uuid":"1234a654867",
            "textValue": ""
        }]*/undefined,
        //request的textarea表现形式
        requestJsonArgs:"",
        responseTableArgs:undefined,
        responseJsonArgs:"",
    },

};