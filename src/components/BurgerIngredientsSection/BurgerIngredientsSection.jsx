import PropTypes from 'prop-types';

import { useGetIngredientsQuery } from '../../services/features/ingredients/reducer';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import styles from './BurgerIngredientsSection.module.scss';

function BurgerIngredientsSection({ typeRus, typeEng, value, ...rest }) {
  const { data } = useGetIngredientsQuery();
  const ingredients = data?.data || [];

  return (
    <section aria-label={typeRus}>
      <h2 className={styles.heading} id={value}>
        {typeRus}
      </h2>
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

BurgerIngredientsSection.propTypes = {
  typeRus: PropTypes.string.isRequired,
  typeEng: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default BurgerIngredientsSection;
