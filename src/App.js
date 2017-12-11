import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <svg width="800" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
          {[...Array(10)].map((x, i) => <rect x="21" y={45 + 25 * i} width="750" height="2" fill="#333333" />)}
          {[...Array(4)].map((x, i) => <rect x={187 + 170 * i} y="36" width="2" height="250" fill="#333333" />)}
          {[...Array(4)].map((x, i) => <rect x={94 + 170 * i} y="36" width="6" height="250" fill="#D8D8D8" />)}
          {[...Array(4)].map((x, i) => <text x={93 + 170 * i} y="24" font-family="Helvetica" font-size="16" fill="#D8D8D8"> {i+1} </text>)}
          <rect x="77" y="70" width="38" height="26" fill="#FCFF0A" />
          <rect x="77" y="147" width="38" height="26" fill="#FCFF0A" />
          <rect x="77" y="224" width="38" height="26" fill="#FCFF0A" />
          <rect x="168" y="70" width="38" height="26" fill="#FCFF0A" />
          <rect x="168" y="147" width="38" height="26" fill="#FCFF0A" />
          <rect x="213" y="224" width="38" height="26" fill="#FCFF0A" />
          <rect x="347" y="147" width="38" height="26" fill="#FCFF0A" />
          <rect x="437" y="70" width="38" height="26" fill="#FCFF0A" />
          <rect x="437" y="147" width="38" height="26" fill="#FCFF0A" />
          <rect x="547" y="70" width="38" height="26" fill="#FCFF0A" />
          <rect x="547" y="147" width="38" height="26" fill="#FCFF0A" />
          <rect x="702" y="147" width="38" height="26" fill="#FCFF0A" />
        </svg>
      </div>
    );
  }
}

export default App;
