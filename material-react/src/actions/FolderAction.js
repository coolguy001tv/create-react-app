/**
 * Created by CoolGuy on 2017/1/8.
 */
import API from '../util/ApiList';
import {ajaxCommon} from '../util';

const FOLDER_ADD = "FOLDER_ADD";//新建目录
const FOLDER_ADJUST = "FOLDER_ADJUST";//调整目录结构
const FOLDER_LIST = "FOLDER_LIST";//获取目录结构列表
const FOLDER_DELETE = "FOLDER_DELETE";//删除目录
const FOLDER_EDIT = "FOLDER_EDIT";//编辑目录

let folderAddSuccess = (data,newFolder) => {
    return {
        type:FOLDER_ADD,
        data,
        newFolder,
    }
};


//
//let mergeFoldersAndData = (folders,data)=>{
//    let fLen = folders.length;
//    folders.map((v)=>{
//
//    })
//
//};

let folderListSuccess = (data)=>{
    console.log(data);
    return {
        type:FOLDER_LIST,
        data,
    }
};


let folderAdjustSuccess = (data) => {
    return {
        type:FOLDER_ADJUST,
        data
    }
};

let folderDeleteSuccess = (data) => {
    return {
        type:FOLDER_DELETE,
        data
    }
};

let folderEditSuccess = (data) => {
    return {
        type:FOLDER_EDIT,
        data
    }
};
export default {
    FOLDER_ADD,
    FOLDER_ADJUST,
    FOLDER_LIST,
    FOLDER_DELETE,
    FOLDER_EDIT,
    folderAdd :(projectId,folderId,folderName,list) => {
        return ajaxCommon({
            api:API.Folder.add(projectId),
            data:{folderId,folderName,folders:{list:list}},
            success:(data)=>{
                return folderAddSuccess(data,{folderId,folderName});
            }});
    },
    folderList : (projectId)=>{
        return ajaxCommon({
            api:API.Folder.list(projectId),
            success:folderListSuccess
        })
    },
    folderAdjust : (projectId,list)=>{
        return ajaxCommon({
            api:API.Folder.adjust(projectId),
            data:{folders:{list:list}},
            success:folderAdjustSuccess
        })
    },
    folderDelete : (projectId,folderId)=>{
        return ajaxCommon({
            api:API.Folder.delete(projectId,folderId),
            success:folderDeleteSuccess
        })
    },
    folderEdit : (projectId,folderId)=>{
        return ajaxCommon({
            api:API.Folder.edit(projectId,folderId),
            success:folderEditSuccess
        })
    },

}