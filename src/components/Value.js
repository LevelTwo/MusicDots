import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles';

export function FlexColumn(props) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

export function FlexRow(props) {
  return <FlexColumn style={{ flexDirection: 'row', ...props.style }}>{props.children}</FlexColumn>
}

export class ValueButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        backgroundColor: colors.background,
        border: `1px solid ${colors.gray}`,
        borderLeft: 0,
        color: colors.yellow,
        cursor: 'pointer',
        fontSize: '13px',
        lineHeight: 1.7,
        userSelect: 'none',
        width: '24px',
        ...this.props.style,
      },
    };
  }
  getStyles() {
    return this.state.styles;
  }
  highlightColor = () => {
    this.setState({
      styles: {
        ...this.state.styles,
        backgroundColor: colors.gray,
      }
    });
  }
  deHighlightColor = () => {
    this.setState({
      styles: {
        ...this.state.styles,
        backgroundColor: colors.background,
      }
    });
  }
  render() {
    return (
      <div
        className="ValueButton"
        onClick={this.props.onClick}
        onMouseEnter={this.highlightColor}
        onMouseLeave={this.deHighlightColor}
        style={this.state.styles}
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
}

export class Value extends Component {
  getStyles() {
    const styles = {
      input: {
        border: `1px solid ${colors.gray}`,
        background: colors.background,
        boxSizing: 'border-box',
        color: colors.yellow,
        height: '48px',
        lineHeight: '1.65',
        outline: 0,
        paddingLeft: '20px',
        width: '48px',
      },
      label: {
        fontSize: '11px',
        padding: '5px',
      },
    };
    return styles;
  }

  render() {
    const styles = this.getStyles();
    const updateInput = (func) => () => { this.input.value = func(); }
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
            style={styles.input}
            ref={el => this.input = el}
          />
          <FlexColumn className="ValueControls">
            <ValueButton
              className="ValueIncrement"
              label={'+'}
              onClick={updateInput(this.props.onIncrement)}
            />
            <ValueButton
              className="ValueDecrement"
              label={'-'}
              onClick={updateInput(this.props.onDecrement)}
            />
          </FlexColumn>
        </FlexRow>
        <span
          className="ValueLabel"
          style={styles.label}
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
}
