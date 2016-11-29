import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link,hashHistory } from 'react-router';
import configureStore from './configureStore';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import { Provider,connect } from 'react-redux'

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
let store = configureStore(Reducer,{
    user:{
        userName:"丁丁",
        password:"123456789"
    }
});


class TheApp extends React.Component{
    componentDidMount() {
        let {fetch} = this.props;

    }
    render(){
        return (
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
        )
    }
};

//TheApp = connect((state)=>{
//    return {
//        state
//    }
//}, undefined, null, {pure:false})(TheApp);
ReactDOM.render(
    <Provider store={store}>
        <TheApp/>
    </Provider>,
  document.getElementById('root')
);
