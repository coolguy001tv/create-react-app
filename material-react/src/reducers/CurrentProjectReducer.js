/**
 * Created by CoolGuy on 2016/12/31.
 * currentProject拆分成多个小的部分
 */
import { combineReducers } from 'redux';
import actions from '../actions/index';
import {getObjByUuid} from '../util';
let request = (state = {}, action) => {
    switch (action.type) {
        //case actions.XXX:
        case actions.CHANGE_API_REQUEST_TYPE:
            let uuid = action.uuid;
            let type = action.value;
            let one = getObjByUuid(state,uuid);
            if(one){
                one.type = type;
            }
            return state;
        default:
            return state
    }
};
export default {
    request
}