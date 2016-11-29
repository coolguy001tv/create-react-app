/**
 * Created by CoolGuy on 2016/10/19.
 */
import {createStore,applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default (reducer,initialState)=>{
    return createStore(reducer,initialState, composeEnhancers(
        applyMiddleware(
            thunkMiddleware // 允许我们 dispatch() 函数
        )
    ));
};