import { useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import {
  getSelectedBun,
  getSelectedIngredients,
} from '../../../../services/features/selected-ingredients/selectors';
import countSelectedIngredients from '../../../../utils/calculations/selected-ingredients-counter';
import { ingredientType } from '../../../../utils/types/ingredients';
import DRAG_TYPES from '../../../../utils/drag-types';
import styles from './burger-ingredient.module.scss';

function BurgerIngredient({ ingredient }) {
  const location = useLocation();

  const selectedBun = useSelector(getSelectedBun);
  const selectedIngredients = useSelector(getSelectedIngredients);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DRAG_TYPES.INGREDIENT,
      item: ingredient,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const counter = useMemo(
    () =>
      countSelectedIngredients(ingredient, selectedBun, selectedIngredients),
    [selectedBun, selectedIngredients]
  );

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
          {(counter && <Counter count={counter} size="default" />) || null}
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
};

export default memo(BurgerIngredient);
