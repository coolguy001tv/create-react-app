/**
 * Created by CoolGuy on 2016/12/31.
 * currentProject拆分成多个小的部分
 */
import {getObjByUuid,createUuid as uuidFunc,getParentArrayByUuid} from '../util';
import initData from '../initData'
let modify = (state = [], action) => {
    let uuid = action.uuid;
    let value = action.value;
    let key = action.key;
    let one = getObjByUuid(state,uuid);
    if(one){
        one[key] = value;
    }
    return state;
};
let add = (state = [],action) => {
    let uuid = action.uuid;
    let newOne = initData("request",{uuid:uuidFunc()});
    //不传uuid表示新增到最后
    if(!uuid){
        state.push(newOne);
        return state;
    }
    //先找到要新增的元素
    let current = getObjByUuid(state,uuid);
    if(!current){
        console.error("数据异常，请检查程序");
        return state;
    }
    let type = current.type;
    //如果type是以下2种，需要新增的是这个type的子集，否则是和同层的集
    if(~['object','object-array'].indexOf(type)){
        current.children = current.children || [];
        current.children.unshift(newOne);
    }else{
        let {array,index} = getParentArrayByUuid(state,uuid);
        console.log(array,index);
        array.splice(index+1,0,newOne);
    }
    return state;

};
//目前删除是删掉当前与当前的子集
let del = (state = [],action) => {
    let uuid = action.uuid;
    let {array,index} = getParentArrayByUuid(state,uuid);
    array.splice(index,1);
    return state;

};

export default {
    modify,
    add,
    del
}