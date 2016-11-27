/**
 * Created by CoolGuy on 2016/11/27.
 */
import { combineReducers } from 'redux';
import actions from '../actions/index';
let user = (state={},action)=>{
    //console.log(action);
    switch (action.type){
        case actions.Login:
            return Object.assign({},action.data,state);
        default:
            return state;
    }
}
export default combineReducers({
    user,
})