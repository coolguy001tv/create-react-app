import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React~1</h2>
        </div>
          <div>
              <RaisedButton label="Default" />
          </div>
          <div className="hello">
              <div className="world">AAAA</div>
          </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          {this.props.children}
      </div>
    );
  }
}

export default App;
