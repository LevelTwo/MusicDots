import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'components/Grid';

export default class PlayHead extends Component {
  state = {
    start: this.props.start || 0,
    x: this.props.start || 0,
    end: this.props.end || 0,
    lastUpdate: null,
    delta: this.props.beat * this.props.bpm / 60 / 60,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.running) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  start = () => {
    // const FRAME_DURATION = 1000 / 60;
    // const getTime = typeof performance === 'function' ? performance.now : Date.now;
    // const now = getTime();
    // const delta = (now - this.state.x) / FRAME_DURATION;
    const nextStep = this.state.x + this.state.delta;
    const xx = (nextStep > this.state.end) ? this.state.start : nextStep;
    this.setState({x: xx});
    this.requestId = requestAnimationFrame(this.start);
  };

  stop = () => {
    this.requestId && cancelAnimationFrame(this.requestId);
  };

  render() {
    const className = this.props.running ? "active" : "inactive";

    return (
      <svg className="PlayHead">
        <Bar
          className={className}
          x={this.state.x}
          y={0}
          height={this.props.height}
          fill="white"
        />
      </svg>
    );
  }
}
PlayHead.propTypes = {
  bpm: PropTypes.number.isRequired,
};
