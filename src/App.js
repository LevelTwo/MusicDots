import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let meter = [];
    let subMeter = [];
    let horMeter = [];
    let notes = [];
    let numbers = [];

    const canvasHeight = 300;
    const canvasWidth = 800;
    const gray = "#D8D8D8";
    const primary = "#333333";
    const yellow = "#FCFF0A";

    const grid = 2;
    const meterSize = 6;
    const paddingX = 50;
    const paddingY = 16;

    const columns = 4;
    const gridRows = 5;
    const rows = gridRows + 3;
    const subColX = 8;
    const subColY = 2;
    const col = (canvasWidth - 2 * paddingX) / (columns * subColX - 1);
    const row = (canvasHeight - 2 * paddingY) / (rows * subColY - 1);
    const fontSize = row;

    for (let i = 0; i < columns; i++) {
      const offsetX = paddingX + col * i * subColX;
      const meterY = paddingY + row * subColY;
      numbers.push(<text x={offsetX - fontSize / 8} y={paddingY + row * subColY / 2} font-family="Helvetica" font-size={fontSize} fill={gray}> {i+1} </text>);
      meter.push(<rect x={offsetX} y={meterY} width={meterSize} height={row * (rows - 2) * subColY} fill={gray} />);
      subMeter.push(<rect x={offsetX + col * subColX / 2} y={meterY} width={grid} height={row * (rows - 2) * subColY} fill={primary} />);
    }

    for (let i = 0; i < gridRows; i++) {
      const offsetY = paddingY + row * (i + 2) * subColY;
      horMeter.push(<rect x={paddingX} y={offsetY} width={canvasWidth - 2 * paddingX} height={grid} fill={primary} />);
    }

    const noteX = (i) => paddingY + row * (i + 2) * subColY;
    const noteY = (i) => paddingX + col * i;

    const points = [[77, 70], [77, 147], [77, 224], [168, 70], [168, 147], [213, 224], [347, 147], [437, 70], [437, 147], [547, 70], [547, 147], [702, 147]];
    points.forEach(x => notes.push(<rect x={x[0]} y={x[1]} width="38" height="26" fill={yellow} />));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <svg width={canvasWidth} height={canvasHeight} version="1.1" xmlns="http://www.w3.org/2000/svg" style={{backgroundColor: 'red'}}>
          {numbers}
          {subMeter}
          {horMeter}
          {meter}
          {notes}
        </svg>
      </div>
    );
  }
}

export default App;
