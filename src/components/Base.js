import React from 'react';
import PropTypes from 'prop-types';
import './Base.css';

export function NamedDiv(props) {
  return <div {...props}> {props.children} </div>;
}
NamedDiv.propTypes = {
  className: PropTypes.string.isRequired,
};

export function Line({className="line", ...props}) {
  return <rect className={className} {...props} />;
}
Line.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string,
};
Line.defaultProps = {
  fill: "var(--gray)",
};

export function Label({label, ...props}) {
  return <text fontFamily="Helvetica" {...props}>{label}</text>;
}
Label.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
  fill: PropTypes.string,
};
Label.defaultProps = {
  fill: "var(--gray)",
};
