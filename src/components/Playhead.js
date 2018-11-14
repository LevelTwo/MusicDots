import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'components/Grid';

export class Playhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: this.props.start,
      x: this.props.start,
      end: this.props.end,
    }
  }

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
    const nextStep = this.state.x + 3
    const xx = (nextStep > this.state.end) ? this.state.start : nextStep;
    this.setState({x: xx});
    this.requestId = requestAnimationFrame(this.start);
  }

  stop = () => {
    this.requestId && cancelAnimationFrame(this.requestId);
  }

  render() {
    const className = this.props.running ? "active" : "not";

    return (
      <svg key="playhead">
        <Bar
          className={className}
          x={this.state.x}
          key="asdf"
          y={10}
          height={100}
        />
      </svg>
    )
  }
}
Playhead.propTypes = {
  bpm: PropTypes.number.isRequired,
}
