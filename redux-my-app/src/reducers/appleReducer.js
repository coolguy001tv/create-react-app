/**
 * Created by CoolGuy on 2016/10/11 17:13.
 */
import {combineReducers} from 'redux';
import {EAT_APPLE,BEGIN_PICK_APPLE,DONE_PICK_APPLE,FAIL_PICK_APPLE,eatApple,fetchApple} from '../actions/apple';
function appleReducer(state=[],action){
    switch(action.type){
        case EAT_APPLE:
            let id = action.id;
            let index = state.findIndex((value,i)=>{
                return value.id == id
            });
            if(-1 === index){
                return state;
            }
            //console.log(index);
            //return [
            //    ...state.slice(0,index-1),
            //    Object.assign({},state[index],{
            //        isEaten:true
            //    }),
            //    ...state.slice(index + 1)
            //];
            let arr = state.slice();
            arr[index].isEaten = true;
            return arr;
        case DONE_PICK_APPLE:
            return [
                ...state,
                action.apple
            ];
        default:
            return state;
    }
}
function error(state="",action){
    console.log(action);
    switch(action.type){
        case FAIL_PICK_APPLE:
            return action.error.toString();
        default:
            return "";//除非有错误信息，否则应该是空
    }
}

export default combineReducers({
    apple:appleReducer,
    error
})