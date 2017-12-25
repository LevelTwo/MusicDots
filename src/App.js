import React, { Component } from 'react';
import Grid from 'components/Grid';
import './App.css';

class App extends Component {
  render() {
    const grid = <Grid />;
    return (
      <div className="App">
        {grid}
      </div>
    );
  }
}

export default App;
