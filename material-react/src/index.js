import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,hashHistory } from 'react-router';
import configureStore from './configureStore';

import ThemeSetting from './components/ThemeSetting';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import { Provider } from 'react-redux'

import './styles/index.scss';

//containers & components
import Layout from'./components/Layout/index';
import Login from './containers/Login';
import Reg from './containers/Reg';
import Dashboard from './components/Dashboard';
import NoMatch from './containers/NoMatch';
import ApiPage from './containers/ApiPage';
import EditProject from './containers/EditProject';
//reducers
import Reducer from './reducers';
import InitReducer from './initReducer';


//store
let store = configureStore(Reducer,InitReducer);


class TheApp extends React.Component{
    componentDidMount() {

    }
    render(){
        return (
            <ThemeSetting>
                <Router history={hashHistory}>
                    <Route path="/" component={Layout}>
                        <Route path="login" component={Login}/>
                        <Route path="reg" component={Reg}/>
                        <Route path="dashboard" component={Dashboard}>
                            <Route path="edit" component={EditProject}/>
                            <Route path="edit/:id" component={EditProject}/>
                            <Route path="project" component={EditProject}/>
                            <Route path="project/:id" component={ApiPage}/>
                        </Route>
                        <Route path="*" component={NoMatch}/>
                    </Route>
                </Router>
            </ThemeSetting>
        )
    }
};
//注意，目前的情况下react-router和react-redux在顶层上，如果connect的话会有问题
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
