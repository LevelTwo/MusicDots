import React, { Component } from 'react';
import Controls from 'components/Controls';
import Grid from 'components/Grid';
import './App.css';

const MIN_BARS = 2;
const MAX_BARS = 4;
const MIN_STAFFS = 2;
const MAX_STAFFS = 10;
const MIN_BPM = 60;
const MAX_BPM = 140;

const validateBars = bars => bars && (bars >= MIN_BARS) && (bars <= MAX_BARS);
const validateStaffs = staffs => staffs && (staffs >= MIN_STAFFS) && (staffs <= MAX_STAFFS);
const validateBPM = bpm => bpm && (bpm >= MIN_BPM) && (bpm <= MAX_BPM);

class App extends Component {
  state = {
    barLength: 2,
    bars: 2,
    beats: 4,
    bpm: 120,
    canvasHeight: 700,
    canvasWidth: 1024,
    fontSize: 14,
    paddingHeight: 50,
    paddingWidth: 75,
    staffs: 10,
    playHeadRun: false,
  };

  incrementBars = () => {
    const shouldUpdate = validateBars(this.state.bars + 1);
    shouldUpdate && this.setState({ bars: this.state.bars + 1 });
    return this.state.bars + shouldUpdate;
  };

  decrementBars = () => {
    const shouldUpdate = validateBars(this.state.bars - 1);
    shouldUpdate && this.setState({ bars: this.state.bars - 1 });
    return this.state.bars - shouldUpdate;
  };

  incrementStaffs = () => {
    const shouldUpdate = validateStaffs(this.state.staffs + 1);
    shouldUpdate && this.setState({ staffs: this.state.staffs + 1 });
    return this.state.staffs + shouldUpdate;
  };

  decrementStaffs = () => {
    const shouldUpdate = validateStaffs(this.state.staffs - 1);
    shouldUpdate && this.setState({ staffs: this.state.staffs - 1 });
    return this.state.staffs - shouldUpdate;
  };

  incrementBPM = () => {
    const shouldUpdate = validateBPM(this.state.bpm + 1);
    shouldUpdate && this.setState({ bpm: this.state.bpm + 1 });
    return this.state.bpm + shouldUpdate;
  };

  decrementBPM = () => {
    const shouldUpdate = validateBPM(this.state.bpm - 1);
    shouldUpdate && this.setState({ bpm: this.state.bpm - 1 });
    return this.state.bpm - shouldUpdate;
  };

  updateValue = (state, validate) => {
    return (evt) => {
      validate(evt.target.value) && this.setState({ [state] : evt.target.value });
    }
  };

  togglePlayHead = () => {
    this.setState({ playHeadRun: !this.state.playHeadRun });
  };

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlayHead();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Controls
          bars={this.state.bars}
          bpm={this.state.bpm}
          staffs={this.state.staffs}
          incrementBars={this.incrementBars}
          decrementBars={this.decrementBars}
          incrementBPM={this.incrementBPM}
          decrementBPM={this.decrementBPM}
          incrementStaffs={this.incrementStaffs}
          decrementStaffs={this.decrementStaffs}
          updateBars={this.updateValue("bars", validateBars)}
          updateBPM={this.updateValue("bpm", validateBPM)}
          updateStaffs={this.updateValue("staffs", validateStaffs)}
          togglePlayHead={this.togglePlayHead}
          playHeadRun={this.state.playHeadRun}
        />
        <Grid {...this.state} />
      </div>
    );
  }
}

export default App;
