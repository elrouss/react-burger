import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../../../utils/types/ingredients';
import DRAG_TYPES from '../../../../utils/drag-types';
import styles from './burger-ingredient.module.scss';

function BurgerIngredient({ ingredient, ingredientsCounter }) {
  const location = useLocation();

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DRAG_TYPES.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const counterValue = ingredientsCounter.get(ingredient._id);

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
    >
      <div ref={dragPreview} role="button" tabIndex={0}>
        <article
          className={`${styles.card} ${isDragging && styles.cardDragging}`}
          ref={drag}
        >
          {(counterValue && <Counter count={counterValue} size="default" />) ||
            null}
          <img
            className={styles.image}
            src={ingredient?.image}
            alt={`Ингредиент: ${ingredient?.name}`}
          />
          <div className={styles.price}>
            <span>{ingredient?.price}</span>
            <CurrencyIcon />
          </div>
          <h3 className={styles.heading}>{ingredient?.name}</h3>
        </article>
      </div>
    </Link>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  ingredientsCounter: PropTypes.instanceOf(Map).isRequired,
};

export default memo(BurgerIngredient);
