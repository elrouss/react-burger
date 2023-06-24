import { memo } from 'react';
import PropTypes from 'prop-types';

import { useDrag } from 'react-dnd';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../utils/types/ingredients';
import DRAG_TYPES from '../../utils/drag-types';

import styles from './BurgerIngredient.module.scss';

function BurgerIngredient({ ingredient, ingredientsCounter, onModalOpen }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DRAG_TYPES.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const counterValue = ingredientsCounter.get(ingredient._id);

  return (
    <div
      ref={dragPreview}
      role="button"
      tabIndex={0}
      onClick={(evt) => {
        onModalOpen(evt, ingredient);
      }}
      onKeyDown={(evt) => onModalOpen(evt, ingredient)}
    >
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
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  ingredientsCounter: PropTypes.instanceOf(Map).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default memo(BurgerIngredient);
