import PropTypes from "prop-types";

const {exact, oneOf, string, arrayOf} = PropTypes;

const artistQuestion = exact({
  type: oneOf([`artist`]).isRequired,
  song: exact({
    artist: string.isRequired,
    src: string.isRequired
  }).isRequired,
  answers: arrayOf(
      exact({
        picture: string.isRequired,
        artist: string.isRequired
      }).isRequired
  ).isRequired
}).isRequired;

export default artistQuestion;
