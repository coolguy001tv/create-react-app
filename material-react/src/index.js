import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Layout from'./components/Layout';
import Login from './containers/Login';
import Reg from './containers/Reg';
import Dashboard from './containers/Dashboard';
import './index.css';


const TheApp = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <Route path="login" component={Login}/>
                <Route path="reg" component={Reg}/>
                <Route path="dashboard" component={Dashboard}/>

                {/*<Route path="*" component={NoMatch}/>*/}
            </Route>

        </Router>
    </MuiThemeProvider>
);

ReactDOM.render(
  <TheApp />,
  document.getElementById('root')
);
