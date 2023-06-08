import PropTypes from 'prop-types';

const ingredientsTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number,
      carbohydrates: PropTypes.number,
      fat: PropTypes.number,
      image: PropTypes.string,
      image_large: PropTypes.string,
      image_mobile: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      proteins: PropTypes.number,
      type: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string,
    })
  ),
};

export default ingredientsTypes;
