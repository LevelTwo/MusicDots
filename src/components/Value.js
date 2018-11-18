import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlexColumn, FlexRow } from 'components/Base';
import './Value.css';

export class Button extends Component {
  render() {
    return (
      <div
        className={`Button ${this.props.className || ""}`}
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {this.props.label}
      </div>
    );
  }
}

export class ValueButton extends Component {
  render() {
    return (
      <div
        className={`ValueButton ${this.props.className || ""}`}
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {this.props.label}
      </div>
    );
  }
}
ValueButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default class Value extends Component {
  preventArrowKey = e => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown")
      e.preventDefault();
  };

  componentDidMount() {
    this.input.addEventListener('keydown', this.preventArrowKey);
  }

  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.preventArrowKey);
  }

  updateInput = func => () => { this.input.value = func(); };

  render() {
    this.up = <Chevron />;
    this.down = <ChevronReverse />;
    return (
      <FlexColumn className={`Value ${this.props.className || ""}`}>
        <FlexRow>
          <input
            className="ValueInput"
            type="number"
            inputMode="numeric"
            onInput={this.props.onInput}
            defaultValue={this.props.bars}
            ref={el => this.input = el}
          />
          <FlexColumn className="ValueControls">
            <ValueButton
              className="ValueIncrement"
              label={this.up}
              onClick={this.updateInput(this.props.onIncrement)}
            />
            <ValueButton
              className="ValueDecrement"
              label={this.down}
              onClick={this.updateInput(this.props.onDecrement)}
              style={{borderTop: "none"}}
            />
          </FlexColumn>
        </FlexRow>
        <span className="ValueLabel">{this.props.label}</span>
      </FlexColumn>
    );
  }
}
Value.propTypes = {
  bars: PropTypes.number,
  label: PropTypes.string.isRequired,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onInput: PropTypes.func,
};

export function Chevron({size=8, ...props}) {
  return <svg viewBox="0 0 1792 1792" height={`${size}px`} fill="var(--yellow)" {...props}>
    <path transform="translate(0, -130)" d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45
  19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z"/>
  </svg>;
}

export function ChevronReverse({...props}) {
  return <Chevron style={{transform: "rotate(180deg)"}} {...props} />;
}