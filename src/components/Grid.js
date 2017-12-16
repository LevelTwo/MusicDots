import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles';

export function Line({x, y, width, height, fill=colors.gray, ...props}) {
  return <rect x y width height fill {...props} />;
}
Line.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string,
};
Line.defaultProps = {
  fill: colors.gray,
};

export function Bar({x, y, width=2, height, ...props}) {
  return <Line x y height width {...props} />;
}
Bar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
Bar.defaultProps = {
  width: 2,
}

export function Staff({x, y, width, height=2, ...props}) {
  return <Line x y width height {...props} />;
}
Staff.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
};
Staff.defaultProps = {
  height: 2,
};

export function HyperBar({x, y, width, height, fill=colors.light, ...props}) {
  return <Bar x y height width fill {...props} />;
}
HyperBar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string,
};
HyperBar.defaultProps = {
  fill: colors.light,
};

export function HyperBarLabel({x, y, width, height, label, fill=colors.light, ...props}) {
  return <text x y fill fontSize fontFamily="Helvetica" {...props}>{label + 1}</text>;
}
HyperBarLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
  fill: PropTypes.string,
};
HyperBarLabel.defaultProps = {
  fill: colors.light,
}

export function StaffBarLabel({x, y, width, height, label, fill=colors.gray, ...props}) {
  return <text x y fill fontSize fontFamily="Helvetica" {...props}>{label + 1}</text>;
}
StaffBarLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
  fill: PropTypes.string,
};
StaffBarLabel.defaultProps = {
  fill: colors.gray,
}

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barLength: props.barLength || 2,
      bars: props.bars || 4,
      beats: props.beats || 4,
      canvasHeight: props.canvasHeight || 700,
      canvasWidth: props.canvasWidth || 1024,
      fontSize: props.fontSize || 14,
      paddingHeight: props.paddingHeight || 50,
      paddingWidth: props.paddingWidth || 50,
      staves: props.staves || 30,
    }

    this.bars = [];
    this.hyperBars = [];
    this.hyperBarLabels = [];
    this.staves = [];
    this.staffLabels = [];

    // const rows = staves + 1;
    // const col = (canvasWidth - 2 * paddingWidth) / (bars * beats);
    // const row = (canvasHeight - 2 * paddingHeight) / rows;
    // const noteWidth = col * 0.6;

    console.log(this.state);
  }

  updateState = (newState) => {
    this.setState(newState);
  }

  render() {
    const { canvasWidth, canvasHeight } = this.state;
    return (
      <svg width={canvasWidth} height={canvasHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
      </svg>
    );
  }
}
