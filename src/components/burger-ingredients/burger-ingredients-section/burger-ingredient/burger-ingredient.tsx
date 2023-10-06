import { useMemo, memo, FC, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from 'services/app/hooks';
import {
  getSelectedBun,
  getSelectedIngredients,
} from 'services/features/selected-ingredients/selectors';
import { IIngredientWithId } from 'services/features/ingredients/types';
import DragTypes from 'utils/types/drag-types';
import countSelectedIngredients from 'utils/calculations/selected-ingredients-counter';
import styles from './burger-ingredient.module.scss';

interface IBurgerIngredient {
  ingredient: IIngredientWithId;
}

const BurgerIngredient: FC<IBurgerIngredient> = ({
  ingredient,
}): ReactElement => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            src={ingredient.image}
            alt={`Ингредиент: ${ingredient.name}`}
          />
          <div className={styles.price}>
            <span>{ingredient.price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <h3 className={styles.heading}>{ingredient.name}</h3>
        </article>
      </div>
    </Link>
  );
};

export default memo(BurgerIngredient);
