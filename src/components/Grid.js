import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import { Value } from 'components/Value';
import { colors } from 'styles';

export function Line({...props}) {
  return <rect {...props} />;
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

export function Beat({width=2, ...props}) {
  return <Line width={width} {...props} />;
}

export function Staff({height=2, ...props}) {
  return <Line height={height} {...props} />;
}

export function Bar({fill=colors.light, ...props}) {
  return <Beat fill={fill} {...props} />;
}

export function Label({label, ...props}) {
  return <text fontFamily="Helvetica" {...props}>{label}</text>;
}
Label.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};
Label.defaultProps = {
  fill: colors.gray,
}

export function BarLabel({fill=colors.light, ...props}) {
  return <Label fill={fill} {...props} />;
}

export function Note({fill=colors.yellow, ...props}) {
  return <Line fill={fill} {...props} />;
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
  }

  incrementBars = () => {
    const shouldUpdate = this.validateBars(this.state.bars + 1);
    shouldUpdate && this.setState({ bars: this.state.bars + 1 });
    return this.state.bars + shouldUpdate;
  }

  decrementBars = () => {
    const shouldUpdate = this.validateBars(this.state.bars - 1);
    shouldUpdate && this.setState({ bars: this.state.bars - 1 });
    return this.state.bars - shouldUpdate;
  }

  updateState = (newState) => {
    this.setState(newState);
  }

  updateValue = (state, validate) => {
    return (evt) => {
      validate(evt.target.value) && this.setState({ [state] : evt.target.value });
    }
  }

  validateBars(bars) {
    return bars && (bars > 3) && (bars < 11);
  }

  render() {
    const { barLength, bars, beats, canvasHeight, canvasWidth, fontSize, paddingHeight, paddingWidth, staves } = this.state;
    const barUnit = (canvasWidth - 2 * paddingWidth) / (bars * beats);
    const staffUnit = (canvasHeight - 2 * paddingHeight) / (staves + 1);
    const barHeight = staffUnit * (staves + 1) + barLength;
    const noteWidth = barUnit * 0.6;

    this.bars = range(bars + 1).map((bar, idx) => {
      const className = "bar";
      return <Bar
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth + barUnit * beats * idx}
        y={paddingHeight}
        height={barHeight}
      />
    });

    this.beats = range(bars * beats).map((beat, idx) => {
      const className = "gridBeat";
      return <Beat
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth + barUnit * idx}
        y={paddingHeight}
        height={barHeight}
      />
    });

    this.staves = range(staves + 1).map((staff, idx) => {
      const className = "gridStaff";
      return <Staff
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth}
        y={paddingHeight + staffUnit * (idx + 1)}
        width={canvasWidth - 2 * paddingWidth}
      />
    });

    this.barLabels = range(bars).map((bar, idx) => {
      const className = "gridBarLabel";
      return <BarLabel
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth + barUnit * beats * idx + fontSize}
        y={paddingHeight + fontSize / 2}
        fontSize={fontSize}
        label={idx + 1}
      />
    });

    this.staffLabels = range(staves).map((staff, idx) => {
      const className = "gridStaffLabel";
      return <Label
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth - ((idx < 9) ? 1 : 1.5) * fontSize - noteWidth / 2}
        y={paddingHeight + staffUnit * idx + staffUnit / 2 + barUnit / 2}
        fontSize={fontSize}
        label={idx + 1}
      />
    });

    const points = [[1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 2, 2], [1, 2, 4], [1, 4, 0], [1, 4, 2], [2, 1, 4], [2, 4, 2],
                    [3, 2, 0], [3, 2, 2], [3, 4, 0], [3, 4, 2], [4, 4, 2]];
    this.notes = points.map((note, idx) => {
      const [bar, beat, staff] = note;
      const className = "gridNote";
      return <Note
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth + barUnit * ((bar - 1) * beats + (beat - 1)) - noteWidth / 2 + barLength / 2}
        y={paddingHeight + staffUnit * (staff + 1) + barLength}
        width={noteWidth}
        height={staffUnit - barLength}
      />;
    });

    return (
      <div>
        <Value
          bars={this.state.bars}
          label={'Bars'}
          onIncrement={this.incrementBars}
          onDecrement={this.decrementBars}
          onInput={this.updateValue('bars', this.validateBars)}
        />
        <div>
          <svg className="Grid" width={canvasWidth} height={canvasHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
            {this.beats}
            {this.bars}
            {this.notes}
            {this.barLabels}
            {this.staffLabels}
          </svg>
        </div>
      </div>
    );
  }
}
