/**
 * Created by CoolGuy on 2016/11/27.
 */
import { combineReducers } from 'redux';
import actions from '../actions/index';
let user = (state={},action)=>{
    //console.log(action);
    switch (action.type){
        case actions.LOGIN:
            let obj = Object.assign({},state,action.data);
            console.log(obj);
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

export default combineReducers({
    user,
    theme,
})