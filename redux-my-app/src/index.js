import React from 'react';
import {render} from 'react-dom';
import {createStore,applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import AllApp from './AllApp';
import './index.css';
import appleReducer from './reducers/appleReducer'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'
const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(appleReducer, composeEnhancers(
    applyMiddleware(
        thunkMiddleware // 允许我们 dispatch() 函数
        ,loggerMiddleware
    )
));

render(
  <Provider store={store}>
      <AllApp/>
  </Provider>,
  document.getElementById('root')
);
