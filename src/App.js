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
    const subColX = 4;
    const subColY = 2;
    const col = (canvasWidth - 2 * paddingX) / (columns * subColX);
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

    const note = (measure, beat, y) => [paddingX + col * ((measure - 1) * subColX + (beat - 1)) - col / 2, paddingY + row * (y + 2) * subColY - row / 2];
    const points = [note(1, 2, 0), note(1, 2, 2), note(1, 2, 4), note(1, 4, 0), note(1, 4, 2), note(2, 1, 4), note(2, 4, 2), note(3, 2, 0), note(3, 2, 2), note(3, 4, 0), note(3, 4, 2), note(4, 4, 2)];
    points.forEach(x => notes.push(<rect x={x[0]} y={x[1]} width={col} height={row * subColY / 2} fill={yellow} />));

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
