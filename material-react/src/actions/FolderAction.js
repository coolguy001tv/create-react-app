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


let getFolderInfo = (infoList,id)=>{
    return infoList.find((v)=>{
        return (v.id === id);
    })
};

let mergeFoldersAndData = (folders,data)=>{
    let newFolders = folders.map((v)=>{
        let info = getFolderInfo(data, v.id);
        return Object.assign(v,info);
    });
    return newFolders;

};

let folderListSuccess = (data)=>{
    let result;
    if(data.folders){
        result = mergeFoldersAndData(data.folders.list,data.data);
    }
    return {
        type:FOLDER_LIST,
        data:result,
    }
};


let folderAdjustSuccess = (data,list) => {
    return {
        type:FOLDER_ADJUST,
        data,
        list
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
                return folderAddSuccess(data,{id:folderId,name:folderName});
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
            success:(data)=>{
                return folderAdjustSuccess(data,list);
            }
        });
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