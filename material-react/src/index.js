import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const TheApp = () => (
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>
);

ReactDOM.render(
  <TheApp />,
  document.getElementById('root')
);
