import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Value, { ValueButton } from 'components/Value';
import './Controls.css';

export default class Controls extends Component {

  render() {
    return (
      <div className="Controls">
        <div className="ControlsContainer">
          <span>Menu</span>
          <Value
            bars={this.props.bars}
            label="Bars"
            onIncrement={this.props.incrementBars}
            onDecrement={this.props.decrementBars}
            onInput={this.props.updateBars}
          />
          <ValueButton
            className="play"
            label="play"
            onClick={this.props.togglePlayHead}
          />
        </div>
      </div>
    );
  }
}
Controls.propTypes = {
  bars: PropTypes.number.isRequired,
  decrementBars: PropTypes.func.isRequired,
  incrementBars: PropTypes.func.isRequired,
  togglePlayHead: PropTypes.func.isRequired,
  updateBars: PropTypes.func.isRequired,
};
