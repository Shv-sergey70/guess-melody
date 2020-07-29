import PropTypes from "prop-types";

const {exact, oneOf, string, arrayOf} = PropTypes;

const genreQuestion = exact({
  type: oneOf([`genre`]).isRequired,
  genre: string.isRequired,
  answers: arrayOf(
      exact({
        src: string.isRequired,
        genre: string.isRequired
      }).isRequired
  ).isRequired
}).isRequired;

export default genreQuestion;
