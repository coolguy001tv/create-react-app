/**
 * Created by CoolGuy on 2017/1/1.
 */
import $ from 'jquery';
import AjaxAction from '../actions/AjaxAction';

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

export var uuid = () =>{
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
export var ajaxCommon = ({api,data,success,fail}) => {
    let {ajaxStart,ajaxFail} = AjaxAction;
    return (dispatch) => {
        dispatch(ajaxStart());
        let ajaxOptions = {
            url:api.url,
            method:api.method
        };
        data && (ajaxOptions.data = {...data});
        let token = sessionStorage['token'];
        token && (ajaxOptions.headers = {"auth-token":token});
        return ajax(ajaxOptions)
            .done((json)=>{
                if(json && json.result && success){
                    return dispatch(success(json.data || {...data}))
                }else{
                    //异常情况处理，此处先直接打印错误信息
                    console.error(json);
                    if(fail){
                        return dispatch(fail(json));
                    }
                }

            })
            .fail(e=>dispatch(ajaxFail(e)))
    }
};