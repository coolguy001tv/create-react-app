/**
 * Created by CoolGuy on 2016/12/31.
 */
export default {
    user: {
    },
    theme: 'default',
    projectList:[],
    currentProject:{
        request:[{
            "require": "false",
            "children": [{
                "require": "true",
                "type": "string",
                "children": [],
                "name": "hello",
                "testValue": ""
            }, {
                "require": "true",
                "type": "object",
                "children": [{"require": "true", "type": "string", "children": [
                    {"name":"第四季",}
                ], "name": "a", "testValue": ""}],
                "name": "test",
                "testValue": ""
            },{

                "name":"第二季"
            }],
            "type": "object",
            "name": "data",
            "testValue": "",
            "defaultValue": "测试默认值",
            "description": "我的"
        }, {"require": "false", "children": [], "type": "string", "name": "", "testValue": ""}, {
            "require": "false",
            "children": [],
            "type": "string",
            "name": "test",
            "testValue": ""
        }],
        response:[{

        }]
    },

};