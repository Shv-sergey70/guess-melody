import PropTypes from "prop-types";

const {exact, oneOf, string, arrayOf} = PropTypes;

const answers = arrayOf(
    exact({
      picture: string.isRequired,
      artist: string.isRequired
    }).isRequired
).isRequired;

const question = exact({
  type: oneOf([`artist`]).isRequired,
  song: exact({
    artist: string.isRequired,
    src: string.isRequired
  }).isRequired,
  answers
}).isRequired;

export {question, answers};
