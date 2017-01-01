/**
 * Created by CoolGuy on 2016/12/31.
 * currentProject拆分成多个小的部分
 */
import { combineReducers } from 'redux';
import actions from '../actions/index';
let request = (state = {}, action) => {
    switch (action.type) {
        //case actions.XXX:
        default:
            return state
    }
};
export default combineReducers({
    request
})