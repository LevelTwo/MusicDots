import React, { Component } from 'react';
import Grid from 'components/Grid';
import './App.css';

class App extends Component {
  render() {
    let meter = [];
    let subMeter = [];
    let horMeter = [];
    let notes = [];
    let numbers = [];

    const canvasHeight = 700;
    const canvasWidth = 1024;
    const gray = "#D8D8D8";
    const primary = "#333333";
    const yellow = "#FCFF0A";

    const grid = 2;
    const paddingWidth = 50;
    const paddingHeight = 50;

    const bars = 4;
    const beats = 4;
    const gridRows = 30;
    const rows = gridRows + 1;
    const col = (canvasWidth - 2 * paddingWidth) / (bars * beats);
    const row = (canvasHeight - 2 * paddingHeight) / rows;
    const fontSize = 14;
    const noteWidth = col * 0.6;

    const barHeight = row * rows + grid;
    for (let i = 0; i < bars; i++) {
      const offsetX = paddingWidth + col * i * beats;
      numbers.push(<text x={offsetX + col * beats / 2 + fontSize} y={paddingHeight + fontSize / 2} fontFamily="Helvetica" fontSize={fontSize} fill={gray}> {i+1} </text>);
      meter.push(<rect x={offsetX + col * beats / 2} y={paddingHeight} width={grid} height={barHeight} fill={gray} />);
      subMeter.push(<rect x={offsetX} y={paddingHeight} width={grid} height={barHeight} fill={primary} />);
    }
    subMeter.push(<rect x={paddingWidth + col * bars * beats} y={paddingHeight} width={grid} height={barHeight} fill={primary} />);

    for (let i = 0; i < gridRows; i++) {
      const offsetY = paddingHeight + row * (i + 1);
      horMeter.push(<rect x={paddingWidth} y={offsetY} width={canvasWidth - 2 * paddingWidth} height={grid} fill={primary} />);
      const numX = (i < 9) ? paddingWidth - fontSize : paddingWidth - fontSize * 1.5;
      numbers.push(<text x={numX - (noteWidth / 2)} y={offsetY + row / 2 + grid * 2} fontFamily="Helvetica" fontSize={fontSize} fill={gray}> {i+1} </text>);
    }
    horMeter.push(<rect x={paddingWidth} y={paddingHeight + row * rows} width={canvasWidth - 2 * paddingWidth} height={grid} fill={primary} />);

    const note = (bar, beat, y) => [paddingWidth + col * ((bar - 1) * beats + (beat - 1)) - noteWidth / 2 + grid / 2, paddingHeight + row * (y + 1) + grid];
    const points = [note(1, 1, 0), note(1, 2, 0), note(1, 3, 0), note(1, 2, 2), note(1, 2, 4), note(1, 4, 0), note(1, 4, 2), note(2, 1, 4), note(2, 4, 2), note(3, 2, 0), note(3, 2, 2), note(3, 4, 0), note(3, 4, 2), note(4, 4, 2)];
    points.forEach(x => notes.push(<rect x={x[0]} y={x[1]} width={noteWidth} height={row - grid} fill={yellow} />));

    return (
      <div className="App">
        <svg width={canvasWidth} height={canvasHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
          {subMeter}
          {horMeter}
          {meter}
          {notes}
          {numbers}
          <Grid />
        </svg>
      </div>
    );
  }
}

export default App;
