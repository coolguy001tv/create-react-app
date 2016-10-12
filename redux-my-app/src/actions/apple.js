/**
 * Created by CoolGuy on 2016/10/11 16:44.
 */
import 'whatwg-fetch';
export const EAT_APPLE = 'EAT_APPLE';
export const BEGIN_PICK_APPLE = 'BEGIN_PICK_APPLE';
export const DONE_PICK_APPLE = 'DONE_PICK_APPLE';
export const FAIL_PICK_APPLE = 'FAIL_PICK_APPLE';

export function eatApple(id){
    return {
        type:EAT_APPLE,
        id
    }
}
function request(maxId){
    return {
        type:BEGIN_PICK_APPLE,
        id:maxId
    };
}
export function fetchApple(id){
    return (dispatch)=>{
        dispatch(request(id));
        return fetch("http://localhost/apple.php")
            .then(res=>{

                return res.json()
            })
            .then(json=>{
                console.log(json);
                dispatch(receiveApple(json));
            })
            .catch(e=>{
                dispatch(errorFetchApple(e));
            })
    }
};
function receiveApple(apple){
    return {
        type:DONE_PICK_APPLE,
        apple:apple
    }
}
function errorFetchApple(e){
    return {
        type:FAIL_PICK_APPLE,
        error:e
    }
}

