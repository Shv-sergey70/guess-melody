import PropTypes from "prop-types";

const {shape, string, arrayOf, object} = PropTypes;

const question = shape({
  type: string.isRequired,
  answers: arrayOf(object).isRequired
});

export default question;
