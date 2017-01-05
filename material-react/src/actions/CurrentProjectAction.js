/**
 * Created by CoolGuy on 2016/12/31.
 */
const CHANGE_API_REQUEST_DATA = 'CHANGE_API_REQUEST_DATA';//修改API的请求参数的某行
const CHANGE_API_REQUEST_DATA_ALL = 'CHANGE_API_REQUEST_DATA_ALL';//修改API的请求参数的所有数据（通常是因为直接的复制粘贴）
const ADD_API_REQUEST_DATA = 'ADD_API_REQUEST_DATA';//新增一行API的请求参数
const DEL_API_REQUEST_DATA = 'DEL_API_REQUEST_DATA';//删除一行API的请求参数
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
    ADD_API_REQUEST_DATA,
    DEL_API_REQUEST_DATA,
    changeApiRequestData,
    changeApiRequestDataAll,
    addApiRequestData,
    delApiRequestData,
}