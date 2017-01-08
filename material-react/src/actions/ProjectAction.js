/**
 * Created by CoolGuy on 2017/1/8.
 */
import API from '../util/ApiList';
import {ajaxCommon} from '../util';
const PROJECT_ADD = "PROJECT_ADD";//新增一个项目
const PROJECT_EDIT = "PROJECT_EDIT";//设置一个项目
const PROJECT_LIST = "PROJECT_LIST";//获取项目列表
const PROJECT_DELETE = "PROJECT_DELETE";//删除一个项目
const PROJECT_SEARCH = "PROJECT_SEARCH";//搜索一个项目

let projectAddSuccess = (data) => {
    return {
        type: PROJECT_ADD,
        data
    }
};
let projectListSuccess = (data) => {
    return {
        type: PROJECT_LIST,
        data
    }
};
let projectEditSuccess = (data) => {
    return {
        type: PROJECT_EDIT,
        data
    }
};

export default {
    PROJECT_LIST,
    projectList : () => {
        return ajaxCommon({api:API.Project.list,success:projectListSuccess});
    },
    PROJECT_ADD,
    //todo: 暂时不支持ICON上传
    projectAdd : (projectName,description)=>{
        return ajaxCommon({api:API.Project.add,data:{projectName,description},success:projectAddSuccess});
    },
    //todo: 暂时不支持ICON上传
    PROJECT_EDIT,
    projectEdit : (projectId,projectName,description)=>{
        return ajaxCommon({
            api:API.Project.edit(projectId),
            data:{projectName,description},
            success:projectEditSuccess
        });
    },
    PROJECT_DELETE,
    projectDelete : (projectId) => {
        return ajaxCommon({
            api:API.Project.delete(projectId),
            data:{projectId},
            success:(data)=>({
                type:PROJECT_DELETE,
                data
            })
        });
    },
    PROJECT_SEARCH,
    projectSearch : (projectId,searchReq) => {
        return ajaxCommon({
            api:API.Project.search(projectId),
            data:{projectId,searchReq},
            success:(data)=>({
                type:PROJECT_SEARCH,
                data
            })
        });
    },
}