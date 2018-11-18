import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import PlayHead from 'components/PlayHead';
import { Label, Line } from 'components/Base';
import 'components/Grid.css';

export default class Grid extends Component {
  render() {
    const { barLength, bars, beats, canvasHeight, canvasWidth, fontSize, paddingHeight, paddingWidth, staffs } = this.props;
    const beatUnit = (canvasWidth - 2 * paddingWidth) / (bars * beats);
    const staffUnit = (canvasHeight - 2 * paddingHeight) / (staffs + 1);
    const barHeight = staffUnit * (staffs + 1) + barLength;
    const noteWidth = beatUnit * 0.6;

    this.bars = range(bars + 1).map((bar, idx) => {
      const className = "bar";
      return <Bar
        className={className}
        key={`${className}-${idx}`}
        x={beatUnit * beats * idx}
        y={0}
        height={barHeight}
      />
    });

    this.beats = range(bars * beats).map((beat, idx) => {
      const className = "gridBeat";
      return <Beat
        className={className}
        key={`${className}-${idx}`}
        x={beatUnit * idx}
        y={0}
        height={barHeight}
      />
    });

    this.staffs = range(staffs + 1).map((staff, idx) => {
      const className = "gridStaff";
      return <Staff
        className={className}
        key={`${className}-${idx}`}
        x={0}
        y={staffUnit * (idx + 1)}
        width={canvasWidth - 2 * paddingWidth}
      />
    });

    const barsOffsetX = beatUnit / 2 - fontSize / 4;
    const barsOffsetY = fontSize / 2;
    this.barLabels = range(bars).map((bar, idx) => {
      const className = "gridBarLabel";
      return <BarLabel
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth + beatUnit * beats * idx + barsOffsetX}
        y={paddingHeight + barsOffsetY}
        fontSize={fontSize}
        label={idx + 1}
      />
    });

    this.staffLabels = range(staffs).map((staff, idx) => {
      const className = "gridStaffLabel";
      return <Label
        className={className}
        key={`${className}-${idx}`}
        x={paddingWidth - ((idx < 9) ? 1 : 1.5) * fontSize - noteWidth / 2}
        y={paddingHeight + staffUnit * (idx + 1) + (staffUnit + fontSize) / 2}
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
        x={paddingWidth + beatUnit * ((bar - 1) * beats + (beat - 1)) - noteWidth / 2 + barLength / 2}
        y={paddingHeight + staffUnit * (staff + 1) + barLength}
        width={noteWidth}
        height={staffUnit - barLength}
      />;
    });

    this.playHead = <PlayHead
      bpm={this.props.bpm}
      end={beatUnit * beats * bars}
      beat={beatUnit}
      running={this.props.playHeadRun}
      height={barHeight}
    />;

    return (
      <div className="GridContainer">
        <div>
          <svg
            className="Grid"
            width={canvasWidth}
            height={canvasHeight}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg x={paddingWidth} y={paddingHeight}>
              {this.beats}
              {this.bars}
              {this.staffs}
              {this.playHead}
            </svg>
            {this.notes}
            {this.barLabels}
            {this.staffLabels}
          </svg>
        </div>
      </div>
    );
  }
}
Grid.propTypes = {
  barLength: PropTypes.number.isRequired,
  bars: PropTypes.number.isRequired,
  beats: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  paddingHeight: PropTypes.number.isRequired,
  paddingWidth: PropTypes.number.isRequired,
  staffs: PropTypes.number.isRequired,
  playHeadRun: PropTypes.bool.isRequired,
};

export function Note({fill="var(--yellow)", ...props}) {
  return <Line fill={fill} {...props} />;
}

export function Beat({width=2, ...props}) {
  return <Line width={width} {...props} />;
}

export function Staff({height=2, ...props}) {
  return <Line height={height} {...props} />;
}

export function Bar({fill="var(--gray)", ...props}) {
  return <Beat fill={fill} {...props} />;
}

export function BarLabel({fill="var(--gray)", ...props}) {
  return <Label fill={fill} {...props} />;
}
