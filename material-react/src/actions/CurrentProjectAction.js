/**
 * Created by CoolGuy on 2016/12/31.
 */
const CHANGE_API_REQUEST_TYPE = 'CHANGE_API_REQUEST_TYPE';//修改API的请求参数的类型
//修改api-request请求类型
var changeApiRequestType = (uuid,type) => {
    return {
        type:CHANGE_API_REQUEST_TYPE,
        uuid,
        value:type,
    }
};
export default{
    CHANGE_API_REQUEST_TYPE,
    changeApiRequestType,
}