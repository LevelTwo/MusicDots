import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Value, { Button } from 'components/Value';
import './Controls.css';

export default class Controls extends Component {
  render() {
    return (
      <div className="Controls">
          <div className="ControlsMenu">Menu</div>
          <Button
            className="PlayButton"
            label={this.props.playHeadRun ? "Pause" : "Play"}
            onClick={this.props.togglePlayHead}
          />
          <Value
            className="BPMValue"
            bars={this.props.bpm}
            label="BPM"
            onIncrement={this.props.incrementBPM}
            onDecrement={this.props.decrementBPM}
            onInput={this.props.updateBPM}
          />
          <Value
            className="BarsValue"
            bars={this.props.bars}
            label="Bars"
            onIncrement={this.props.incrementBars}
            onDecrement={this.props.decrementBars}
            onInput={this.props.updateBars}
          />
          <Value
            className="StaffsValue"
            bars={this.props.staffs}
            label="Staffs"
            onIncrement={this.props.incrementStaffs}
            onDecrement={this.props.decrementStaffs}
            onInput={this.props.updateStaffs}
          />
        </div>
    );
  }
}
Controls.propTypes = {
  bars: PropTypes.number.isRequired,
  decrementBars: PropTypes.func.isRequired,
  decrementStaffs: PropTypes.func.isRequired,
  incrementBars: PropTypes.func.isRequired,
  incrementStaffs: PropTypes.func.isRequired,
  staffs: PropTypes.number.isRequired,
  togglePlayHead: PropTypes.func.isRequired,
  updateBars: PropTypes.func.isRequired,
  updateStaffs: PropTypes.func.isRequired,
};
