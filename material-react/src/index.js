import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link,hashHistory } from 'react-router'
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware ,compose} from 'redux';


//containers & components
import Layout from'./components/Layout/index';
import Login from './containers/Login';
import Reg from './containers/Reg';
import Dashboard from './containers/Dashboard';
import './index.css';

//reducers
import Reducer from './reducers';


//store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(Reducer,composeEnhancers(applyMiddleware(
    thunk
)));


const TheApp = () => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <Route path="login" component={Login}/>
                    <Route path="reg" component={Reg}/>
                    <Route path="dashboard" component={Dashboard}/>

                    {/*<Route path="*" component={NoMatch}/>*/}
                </Route>

            </Router>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
  <TheApp />,
  document.getElementById('root')
);
