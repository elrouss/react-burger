import { useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from 'components/price/price';
import { useAppSelector } from 'services/app/hooks';
import {
  getSelectedBun,
  getSelectedIngredients,
} from 'services/features/selected-ingredients/selectors';
import { IIngredientWithId } from 'services/features/ingredients/types';
import DragTypes from 'utils/types/drag-types';
import countSelectedIngredients from 'utils/calculations/selected-ingredients-counter';
import { ROUTES } from 'utils/constants';
import styles from './burger-ingredient.module.scss';

interface IBurgerIngredient {
  ingredient: IIngredientWithId;
}

const BurgerIngredient = ({ ingredient }: IBurgerIngredient) => {
  const location = useLocation();

  const selectedBun = useAppSelector(getSelectedBun);
  const selectedIngredients = useAppSelector(getSelectedIngredients);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DragTypes.Ingredient,
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
      to={`${ROUTES.ingredients}/${ingredient._id}`}
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
            src={ingredient.image}
            alt={`Ингредиент: ${ingredient.name}`}
          />
          <Price type="total" totalPrice={ingredient.price} size="small" />
          <h3 className={styles.heading}>{ingredient.name}</h3>
        </article>
      </div>
    </Link>
  );
};

export default memo(BurgerIngredient);
