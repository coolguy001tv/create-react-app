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
    currentProject:{
        //request和response都必须有uuid
        request:[{
            "require": "false",
            "children": [{
                "require": "true",
                "type": "string",
                "children": [],
                "name": "hello",
                "testValue": "",
                "uuid":"234234234324",
            }, {
                "require": "true",
                "type": "object",
                "children": [{"require": "true", "type": "string", "children": [
                    {"name":"第四季","uuid":"123fscxsdf",}
                ], "name": "a","uuid":"1234asz2", "testValue": ""}],
                "name": "test",
                "uuid":"124234sdf",
                "testValue": ""
            },{

                "name":"第二季",
                "uuid":"3487658768",
            }],
            "type": "object",
            "name": "data",
            "uuid":"f213423a234234",
            "testValue": "",
            "defaultValue": "测试默认值",
            "description": "我的"
        }, {"require": "false", "children": [], "type": "string", "name": "","uuid":"1234546", "testValue": ""}, {
            "require": "false",
            "children": [],
            "type": "string",
            "name": "test",
            "uuid":"1234a654867",
            "testValue": ""
        }],
        response:[{

        }]
    },

};