import React, { Component } from 'react';
import Controls from 'components/Controls';
import Grid from 'components/Grid';
import './App.css';

const MIN_BARS = 2;
const MAX_BARS = 4;

class App extends Component {
  state = {
    barLength: 2,
    bars: 2,
    beats: 4,
    canvasHeight: 700,
    canvasWidth: 1024,
    fontSize: 14,
    paddingHeight: 50,
    paddingWidth: 75,
    staves: 30,
    playheadRun: false,
  };

  validateBars(bars) {
    return bars && (bars >= MIN_BARS) && (bars <= MAX_BARS);
  }

  incrementBars = () => {
    const shouldUpdate = this.validateBars(this.state.bars + 1);
    shouldUpdate && this.setState({ bars: this.state.bars + 1 });
    console.log(shouldUpdate + '/' + this.state.bars);
    return this.state.bars + shouldUpdate;
  }

  decrementBars = () => {
    const shouldUpdate = this.validateBars(this.state.bars - 1);
    shouldUpdate && this.setState({ bars: this.state.bars - 1 });
    console.log(shouldUpdate + '/' + this.state.bars);
    return this.state.bars - shouldUpdate;
  }

  updateValue = (state, validate) => {
    return (evt) => {
      validate(evt.target.value) && this.setState({ [state] : evt.target.value });
    }
  }

  togglePlayhead = () => {
    this.setState({ playheadRun: !this.state.playheadRun });
  }

  render() {
    return (
      <div className="App">
        <Controls
          bars={this.state.bars}
          incrementBars={this.incrementBars}
          decrementBars={this.decrementBars}
          updateBars={this.updateValue('bars', this.validateBars)}
          togglePlayhead={this.togglePlayhead}
        />
        <Grid {...this.state} />
      </div>
    );
  }
}

export default App;
