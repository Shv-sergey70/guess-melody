import * as React from 'react';
import {connect} from "react-redux";
import {getMistakes} from "../../reducer/game/selectors";

type Props = {
  mistakes: number
};

const MistakesList: React.FunctionComponent<Props> = ({mistakes}) => {
  const content = new Array(mistakes)
    .fill(``)
    .map((item, i) => <div key={i} className="wrong"/>);

  return (
    <div className="game__mistakes">
      {content}
    </div>
  );
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state)
});

export {MistakesList};
export default connect(mapStateToProps)(MistakesList);
