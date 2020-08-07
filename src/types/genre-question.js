import PropTypes from "prop-types";

const {exact, oneOf, string, arrayOf} = PropTypes;
const answers = arrayOf(
    exact({
      src: string.isRequired,
      genre: string.isRequired
    }).isRequired
).isRequired;

const question = exact({
  type: oneOf([`genre`]).isRequired,
  genre: string.isRequired,
  answers
}).isRequired;

export {question, answers};
