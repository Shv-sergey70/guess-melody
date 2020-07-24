import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getMistakes} from "../../reducer/game/selectors";

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

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state)
});

export {MistakesList};
export default connect(mapStateToProps)(MistakesList);
