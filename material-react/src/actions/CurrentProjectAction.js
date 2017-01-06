/**
 * Created by CoolGuy on 2016/12/31.
 */
//请求
const CHANGE_API_REQUEST_DATA = 'CHANGE_API_REQUEST_DATA';//修改API的请求参数的某行
const CHANGE_API_REQUEST_DATA_ALL = 'CHANGE_API_REQUEST_DATA_ALL';//修改API的请求参数的所有行
const CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL = 'CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL';//修改API的请求参数的所有数据-即修改text-area数据
const ADD_API_REQUEST_DATA = 'ADD_API_REQUEST_DATA';//新增一行API的请求参数
const DEL_API_REQUEST_DATA = 'DEL_API_REQUEST_DATA';//删除一行API的请求参数

//响应
const CHANGE_API_RESPONSE_DATA = 'CHANGE_API_RESPONSE_DATA';//修改API的请求参数的某行
const CHANGE_API_RESPONSE_DATA_ALL = 'CHANGE_API_RESPONSE_DATA_ALL';//修改API的请求参数的所有行
const CHANGE_API_RESPONSE_DATA_TEXT_AREA_ALL = 'CHANGE_API_RESPONSE_DATA_TEXT_AREA_ALL';//修改API的请求参数的所有数据-即修改text-area数据
const ADD_API_RESPONSE_DATA = 'ADD_API_RESPONSE_DATA';//新增一行API的请求参数
const DEL_API_RESPONSE_DATA = 'DEL_API_REQUEST_DATA';//删除一行API的请求参数



var changeApiData = () => {

};




//修改api-request请求类型
var changeApiRequestData = (uuid,key,value) => {
    return {
        type:CHANGE_API_REQUEST_DATA,
        uuid,
        key,
        value:value,
    }
};
var changeApiRequestDataAll = (data) => {
    return {
        type:CHANGE_API_REQUEST_DATA_ALL,
        data
    }
};
var changeApiRequestDataTextAreaAll = (data) => {
    return {
        type:CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL,
        data
    }
};
var addApiRequestData = (uuid) => {
    return {
        type:ADD_API_REQUEST_DATA,
        uuid
    }
};
var delApiRequestData = (uuid) => {
    return {
        type:DEL_API_REQUEST_DATA,
        uuid
    }
};
export default {
    CHANGE_API_REQUEST_DATA,
    CHANGE_API_REQUEST_DATA_ALL,
    CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL,
    ADD_API_REQUEST_DATA,
    DEL_API_REQUEST_DATA,
    changeApiRequestData,
    changeApiRequestDataAll,
    changeApiRequestDataTextAreaAll,
    addApiRequestData,
    delApiRequestData,
    CHANGE_API_RESPONSE_DATA,
    CHANGE_API_RESPONSE_DATA_ALL,
    CHANGE_API_RESPONSE_DATA_TEXT_AREA_ALL,
    ADD_API_RESPONSE_DATA,
    DEL_API_RESPONSE_DATA,
    changeApiRequestData,
    changeApiRequestDataAll,
    changeApiRequestDataTextAreaAll,
    addApiRequestData,
    delApiRequestData,
}