import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const TheApp = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App/>
    </MuiThemeProvider>
);

ReactDOM.render(
  <TheApp />,
  document.getElementById('root')
);
