/**
 * Created by CoolGuy on 2017/1/4.
 */
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

export let supportedType = ["string","number","array","object-array","object","boolean","others"];

export default initData;