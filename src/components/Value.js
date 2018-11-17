import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NamedDiv } from 'components/Base';
import './Value.css';

export function FlexColumn(props) {
  return <NamedDiv className="FlexColumn" {...props} />;
}

export function FlexRow(props) {
  return <NamedDiv className="FlexRow" {...props} />;
}

export class ValueButton extends Component {
  render() {
    return (
      <div
        className={`ValueButton ${this.props.className || ''}`}
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {this.props.label}
      </div>
    );
  }
}
ValueButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default class Value extends Component {
  preventArrowKey = e => {
    if (e.keyCode === 38 || e.keyCode === 40)
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
    // const updateInput = (func) => () => { this.input.value = func(); };
    return (
      <FlexColumn className="Value">
        <FlexRow>
          <input
            className="ValueInput"
            type="number"
            inputMode="numeric"
            min="4"
            max="10"
            step="1"
            onInput={this.props.onInput}
            defaultValue={this.props.bars}
            ref={el => this.input = el}
          />
          <FlexColumn className="ValueControls">
            <ValueButton
              label={"+"}
              onClick={this.updateInput(this.props.onIncrement)}
            />
            <ValueButton
              className="ValueDecrement"
              label={"-"}
              onClick={this.updateInput(this.props.onDecrement)}
            />
          </FlexColumn>
        </FlexRow>
        <span
          className="ValueLabel"
        >
          {this.props.label}
        </span>
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
