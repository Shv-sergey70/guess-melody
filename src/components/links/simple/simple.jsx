import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Simple = ({to, className, onClick, children}) => {
  return (
    <Link
      to={to}
      className={className}
      onClick={onClick} >
      {children}
    </Link>
  );
};

Simple.defaultProps = {
  className: ``,
  onClick: () => {},
  children: ``
};

Simple.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default Simple;
