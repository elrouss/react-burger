import { useContext } from 'react';
import PropTypes from 'prop-types';

import IngredientsContext from '../../contexts/IngredientsContext';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import styles from './BurgerIngredientsSection.module.scss';

function BurgerIngredientsSection({ typeRus, typeEng, value, ...rest }) {
  const { ingredients } = useContext(IngredientsContext);

  return (
    <section aria-label={typeRus}>
      <h2 className={styles.heading} id={value}>
        {typeRus}
      </h2>
      <div className={styles.content}>
        {ingredients
          .filter(({ type }) => type === typeEng)
          .map(({ _id, name, type, image, price }) => (
            <BurgerIngredient
              key={_id}
              _id={_id}
              name={name}
              type={type}
              link={image}
              price={price}
              {...rest}
            />
          ))}
      </div>
    </section>
  );
}

BurgerIngredientsSection.propTypes = {
  typeRus: PropTypes.string.isRequired,
  typeEng: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default BurgerIngredientsSection;
