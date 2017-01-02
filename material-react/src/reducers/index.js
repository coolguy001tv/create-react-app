/**
 * Created by CoolGuy on 2016/11/27.
 */
import { combineReducers } from 'redux';
import actions from '../actions';
import AjaxAction from '../actions/AjaxAction';
//import currentProjectReducer from './CurrentProjectReducer';
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

let currentProject = (state = {}, action) => {
    switch (action.type){
        case actions.CHANGE_API_REQUEST_TYPE:
            return Object.assign(state,action.data);
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
export default combineReducers({
    user,
    theme,
    projectList,
    currentProject,
    globalError,
})