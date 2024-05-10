import PropTypes from "prop-types";
import { ROLE } from "./role";

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
  ROLE_ID,
  ROLE: PropTypes.shape({
    id: ROLE_ID,
    name: PropTypes.string.isRequired,
  }),
  ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
  MEAL: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    calories: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    diet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ingredients: PropTypes.array,
    goal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  ITEM: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
