import { memo } from 'react';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './BurgerIngredient.module.scss';

function BurgerIngredient({ ingredient, onAddIngredient, onModalOpen }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(evt) => {
        onAddIngredient(ingredient);
        onModalOpen(evt, ingredient);
      }}
      onKeyDown={(evt) => onModalOpen(evt, ingredient)}
    >
      <article className={styles.card}>
        <Counter count={1} size="default" />
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

BurgerIngredient.propTypes = ingredientsTypes;

export default memo(BurgerIngredient);
