/**
 * Created by CoolGuy on 2017/1/1.
 */
import $ from 'jquery';
import CommonAction from '../actions/CommonAction';
//只merge不为undefined/null的项
//copy from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
export var objectMergeWithoutEmptyValue = function(target) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    var sk = source[key];
                    if(sk !== undefined && sk !== null){
                        target[key] = source[key];
                    }
                }
            }
        }
    }
    return target;
};

export var createUuid = () =>{
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

//转化成JSON对象格式
export var listToObject = (list) => {
    let obj = {};
    if(!list || !list.length){
        return obj;
    }
    let len = list.length;
    for(let i = 0; i < len; i++){
        let one = list[i];
        let {name,type,textValue,children} = one;
        //console.log(name);
        if(type === "object"){
            obj[name] = listToObject(children);
        }else if(type === "array"){
            obj[name] = textValue.split(",");//array用逗号分割
        }else{
            obj[name] = textValue || "";
        }
    }
    return obj;
};


/**
 * 获取数组类型
 * @param value
 * @returns {string}
 * copy from xiaoyaoji源码dashboard/app/api.js
 * 注意，该方法会忽略掉array-array的情况，这种情况下的数据会有问题
 */
function getArrayValueType(value) {
    var type = 'array';
    if (value.length > 0) {
        var name = value[0].constructor.name;
        //if (name == 'Array') {
        //    type = 'array[array]';
        //} else if (name == 'Object') {
        //    type = 'array[object]';
        //} else if (name == 'String') {
        //    type = 'array[string]'
        //} else if (name == 'Number') {
        //    type = 'array[number]'
        //} else if (name == 'Boolean') {
        //    type = 'array[boolean]'
        //}
        if(name === 'Object') {
            type = 'object-array';
        }
    }
    return type;
}
/**
 * 解析导入数据
 * @param data
 * @param temp
 * copy from xiaoyaoji源码dashboard/app/api.js
 */
export var parseImportData = (data, temp)=>{
    if (data.constructor.name === 'Array') {
        var fullObj = {};
        data.forEach(function (d) {
            if (d.constructor.name === 'Object') {

                for (var key in d) {/*eslint guard-for-in:0*/
                    fullObj[key] = d[key];
                }
            } else if (d.constructor.name === 'Array') {
                parseImportData(d, temp);
            }
        });
        parseImportData(fullObj, temp);
    } else if (data.constructor.name === 'Object') {
        for (var key in data) {
            var v = data[key];
            var t = {children: []};
            t.name = key;
            if (v != undefined) {/*eslint eqeqeq:0*/
                t.textValue = v;//默认情况下使用该值
                if (v.constructor.name === 'Object') {
                    t.type = 'object';
                    parseImportData(v, t.children);
                    t.textValue = '';//对于object的value值没有任何意义
                } else if (v.constructor.name === 'Array') {
                    t.type = getArrayValueType(v);
                    if (t.type === 'object-array') {
                        parseImportData(v, t.children);
                        t.textValue = '';//对于object的value值没有任何意义
                    }/* else if (t.type === 'array[array]') {
                        parseImportData(v[0], t.children);
                        t.textValue = v.join(",");//数组测试数据用整个数组，逗号分割
                    }*/else{
                        t.textValue = v.join(",");//数组测试数据用整个数组，逗号分割
                    }
                } else if (v.constructor.name === 'String') {
                    t.type = 'string'
                } else if (v.constructor.name === 'Number') {
                    t.type = 'number'
                } else if (v.constructor.name === 'Boolean') {
                    t.type = 'boolean'
                }
            } else {
                t.type = '';
            }
            t.require = false;
            t.uuid = createUuid();
            temp.push(t);
        }
    }
};

//在一个嵌套的数组中查找uuid为指定uuid的obj
export var getObjByUuid = (array,uuid) => {
    let theObj = null;
    let findUuid = (arr)=>{
        if(theObj){
            return;//已经找到了
        }
        if(!arr || !arr.length){
            return null;
        }
        let len = arr.length;
        for(let i = 0; i < len; i++){
            let one = arr[i];
            if(one.uuid && one.uuid === uuid){
                theObj = one;
                break;
            }
            if(one.children && one.children.length){
                findUuid(one.children);
            }
        }
    };
    findUuid(array);
    return theObj;

};
//在一个嵌套的数组中查找uuid为指定uuid的父级数组
//假定当前uuid一定在array中（用户如果不能判断这点，请调用getObjByUuid来确保这点）
export var getParentArrayByUuid = (array,uuid) => {
    let parentArray = array;
    let flag = false;
    let index = -1;//当前元素位于parentArray的第几个
    let findParArr = (arr) => {
        if(flag){
            return;
        }
        if(!arr || !arr.length){
            return;
        }
        let len = arr.length;
        for(let i = 0; i < len; i++){
            let one = arr[i];
            if(one.uuid && one.uuid === uuid){
                parentArray = arr;
                flag = true;
                index = i;
                break;
            }
            if(one.children && one.children.length){
                findParArr(one.children);
            }
        }

    };
    findParArr(array);
    return {
        array:parentArray,
        index:index
    };

};




export var ajax = (options)=>{
    let {url,data,method,dataType,headers} = options;
    method = method || "get";
    dataType = dataType || "json";
    return $.ajax({
        url:url,
        data:JSON.stringify(data),
        dataType:dataType,
        type:method,
        contentType:"application/json",
        headers:headers
    });
};
//通用的调用ajax的接口
//如果doNotWaitAjax为真，那么dispatch不需要等待ajax的返回
export var ajaxCommon = ({api,data,success,fail,doNotWaitAjax}) => {
    let {ajaxStart,ajaxFail} = CommonAction;
    return (dispatch) => {
        dispatch(ajaxStart());
        let ajaxOptions = {
            url:api.url,
            method:api.method
        };
        data && (ajaxOptions.data = {...data});
        let token = sessionStorage['token'];
        token && (ajaxOptions.headers = {"auth-token":token});

        let ajaxResult = ajax(ajaxOptions)
            .done((json)=>{
                if(json && json.result && success){
                    return !doNotWaitAjax && dispatch(success(json.data || {...data}))
                }else{
                    //异常情况处理，此处先直接打印错误信息
                    console.error(json);
                    if(fail){
                        return dispatch(fail(json));
                    }
                }

            })
            .fail(e=>dispatch(ajaxFail(e)));

        if(doNotWaitAjax === true){
            return dispatch(success());
        }else{
            return ajaxResult;
        }


    }
};

