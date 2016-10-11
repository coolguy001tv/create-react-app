/**
 * Created by CoolGuy on 2016/10/11 17:13.
 */
import {combineReducers} from 'redux';
import {EAT_APPLE,BEGIN_PICK_APPLE,DONE_PICK_APPLE,FAIL_PICK_APPLE,eatApple,fetchApple} from '../actions/apple';
function appleReducer(apple=[],action){
    switch(action.type){
        case EAT_APPLE:
            let id = action.id;
            let index = apple.findIndex((value,i)=>{
                return i.id == id
            });
            if(-1 === index){
                return state;
            }
            return [
                ...state.slice(0,index),
                Object.assign({},state[index],{
                    isEaten:true
                }),
                ...state.slice(action.index + 1)
            ];
        case DONE_PICK_APPLE:
            return [
                ...state,
                action.apple
            ];
        default:
            return state;
    }
}

export default combineReducers({
    apple:appleReducer
})