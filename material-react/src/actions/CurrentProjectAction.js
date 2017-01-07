/**
 * Created by CoolGuy on 2016/12/31.
 */
//请求
const CHANGE_API_REQUEST_DATA = 'CHANGE_API_REQUEST_DATA';//修改API的请求参数的某行
const CHANGE_API_REQUEST_DATA_ALL = 'CHANGE_API_REQUEST_DATA_ALL';//修改API的请求参数的所有行
const CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL = 'CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL';//修改API的请求参数的所有数据-即修改text-area数据
const ADD_API_REQUEST_DATA = 'ADD_API_REQUEST_DATA';//新增一行API的请求参数
const DEL_API_REQUEST_DATA = 'DEL_API_REQUEST_DATA';//删除一行API的请求参数

//apiType应该只有request和response两种
//修改api-request请求类型
var changeApiRequestData = (apiType,uuid,key,value) => {
    return {
        type:CHANGE_API_REQUEST_DATA,
        apiType,
        uuid,
        key,
        value:value,
    }
};
var changeApiRequestDataAll = (apiType,data) => {
    return {
        type:CHANGE_API_REQUEST_DATA_ALL,
        apiType,
        data
    }
};
var changeApiRequestDataTextAreaAll = (apiType,data) => {
    return {
        type:CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL,
        apiType,
        data
    }
};
var addApiRequestData = (apiType,uuid) => {
    return {
        type:ADD_API_REQUEST_DATA,
        apiType,
        uuid
    }
};
var delApiRequestData = (apiType,uuid) => {
    return {
        type:DEL_API_REQUEST_DATA,
        apiType,
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
}