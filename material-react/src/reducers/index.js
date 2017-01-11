/**
 * Created by CoolGuy on 2016/11/27.
 */
import { combineReducers } from 'redux';
import actions from '../actions';
import AjaxAction from '../actions/AjaxAction';
import CurrentProjectReducer from './CurrentApiReducer';
import {defaultApi} from '../initData';
let user = (state={},action)=>{
    let obj;
    switch (action.type){
        case AjaxAction.LOGIN:
        case AjaxAction.REG:
            obj = Object.assign({},action.data);
            sessionStorage['token'] = action.data.token;//todo:暂时没有特别好的方案，先放这里
            return obj;
        default:
            return state;
    }
};

let theme = (state = {}, action) => {
    switch (action.type){
        case actions.THEME_CHANGE:
            return action.theme;
        default:
            return state
    }
};

let currentApi = (state = defaultApi, action) => {
    let result,merge;
    let {apiType} = action;//apiType应该只有request和response两种
    switch (action.type){
        case actions.CHANGE_API_REQUEST_DATA:
            result = CurrentProjectReducer.modify(state[apiType],action);
            merge = Object.assign({},state,{[apiType]:result});
            return merge;
        case actions.CHANGE_API_REQUEST_DATA_ALL:
            return Object.assign({},state,{[apiType]:action.data});
        case actions.CHANGE_API_REQUEST_DATA_TEXT_AREA_ALL:
            return Object.assign({},state,{[apiType+'TextArea']:action.data});
        case actions.ADD_API_REQUEST_DATA:
            result = CurrentProjectReducer.add(state[apiType],action);
            merge = Object.assign({},state,{[apiType]:result});
            return merge;
        case actions.DEL_API_REQUEST_DATA:
            result = CurrentProjectReducer.del(state[apiType],action);
            merge = Object.assign({},state,{[apiType]:result});
            return merge;
        case actions.CHANGE_API_DATA_BY_KEY:
            let {key,value} = action;
            merge = Object.assign({},state,{[key]:value});
            return merge;
        default:
            return state;
    }
};
let projectList = (state = [], action) => {
    switch (action.type){
        case AjaxAction.PROJECT_LIST:
            return action.data;
        default:
            return state;
    }
};
let globalError = (state = {},action) => {
    switch (action.type){
        case AjaxAction.AJAX_FAIL:
            debugger;
            return {
                msg:action.data || "服务器开小差了"
            };
        default:
            return state;
    }
};

let currentMenu = (state = [],action) => {
    switch (action.type){
        case AjaxAction.FOLDER_ADD:
            let {newFolder} = action;
            newFolder.type = "folder";
            return [...state,newFolder];
        case AjaxAction.FOLDER_LIST:
            return action.data || [];
        case AjaxAction.FOLDER_ADJUST:
            return action.list;
        case AjaxAction.API_ADD:
            return [...action.api.folders.list];
        default:
            return state;
    }
};

let showApi = (state = false, action) => {
    switch (action.type){
        case actions.SHOW_API_DETAIL:
            return true;
        default:
            return state;
    }
};
let currentApiId = (state = null,action) => {
    switch (action.type){
        case AjaxAction.API_ADD:
            return action.api.apiId;
        default:
            return state;
    }
}
export default combineReducers({
    user,
    theme,
    projectList,
    currentApi,
    globalError,
    currentMenu,
    showApi,
    currentApiId,
})