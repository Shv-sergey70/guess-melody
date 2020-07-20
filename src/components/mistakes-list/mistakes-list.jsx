import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

const MistakesList = ({mistakes}) => {
  const content = new Array(mistakes)
    .fill(``)
    .map((item, i) => <div key={i} className="wrong"/>);

  return (
    <div className="game__mistakes">
      {content}
    </div>
  );
};

MistakesList.propTypes = {
  mistakes: PropTypes.number.isRequired
};

const mapStateToProps = ({mistakes}) => ({mistakes});

export {MistakesList};
export default connect(mapStateToProps)(MistakesList);
