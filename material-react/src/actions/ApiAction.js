/**
 * Created by CoolGuy on 2017/1/8.
 */
import API from '../util/ApiList';
import {ajaxCommon} from '../util';

const API_ADD = "API_ADD";//新增API
const API_GET = "API_GET";//获取API详情
const API_DELETE = "API_DELETE";//删除API
const API_EDIT = "API_EDIT";//编辑API

export default {
    API_ADD,
    API_GET,
    API_DELETE,
    API_EDIT,
    apiAdd: (api)=>{
        return ajaxCommon({
            api:API.Api.add,
            data:api,
            success:(data)=>({
                type:API_ADD,
                api
            }),
            doNotWaitAjax:true,
        });
    },
    apiGet: (apiId)=>{
        return ajaxCommon({
            api:API.Api.get(apiId),
            success:(data)=>({
                type:API_GET,
                data,
                apiId
            })
        })
    },
    apiDelete: (apiId)=>{
        return ajaxCommon({
            api:API.Api.delete(apiId),
            success:(data)=>({
                type:API_DELETE,
                data
            })
        })
    },
    apiEdit: (apiId,edit)=>{
        return ajaxCommon({
            api:API.Api.edit(apiId),
            data:{
                apiId,
                ...edit
            },
            success:(data)=>({
                type:API_EDIT,
                data
            })
        })
    }
}