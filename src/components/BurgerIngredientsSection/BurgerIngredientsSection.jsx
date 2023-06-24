import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useGetIngredientsQuery } from '../../services/features/ingredients/reducer';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import styles from './BurgerIngredientsSection.module.scss';

const BurgerIngredientsSection = forwardRef(
  ({ typeRus, typeEng, ...rest }, ref) => {
    const { data } = useGetIngredientsQuery();
    const ingredients = data?.data || [];

    return (
      <section aria-label={typeRus} ref={ref}>
        <h2 className={styles.heading}>{typeRus}</h2>
        <div className={styles.content}>
          {ingredients
            .filter(({ type }) => type === typeEng)
            .map((ingredient) => (
              <BurgerIngredient
                key={ingredient?._id}
                ingredient={ingredient}
                {...rest}
              />
            ))}
        </div>
      </section>
    );
  }
);

BurgerIngredientsSection.propTypes = {
  typeRus: PropTypes.string.isRequired,
  typeEng: PropTypes.string.isRequired,
};

export default BurgerIngredientsSection;
