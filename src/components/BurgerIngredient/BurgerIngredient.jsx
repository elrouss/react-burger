import { memo } from 'react';
import PropTypes from 'prop-types';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredient.module.scss';

function BurgerIngredient({
  _id,
  name,
  type,
  link,
  price,
  selectedIngredients,
  onSelectedIngredients,
  onSelectedBun,
  onModalOpen,
}) {
  const addIngredient = (
    selectedId,
    selectedName,
    selectedType,
    selectedLink,
    selectedPrice
  ) => {
    const ingredientNew = {
      _id: selectedId,
      name: selectedName,
      type: selectedType,
      image: selectedLink,
      price: selectedPrice,
    };

    if (selectedType === 'bun') return onSelectedBun(ingredientNew);

    const isSelected = selectedIngredients.find(
      (ingredient) => ingredient._id === _id
    );

    return isSelected
      ? undefined
      : onSelectedIngredients((prevState) => [...prevState, ingredientNew]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(evt) => {
        addIngredient(_id, name, type, link, price);
        onModalOpen(evt, _id);
      }}
      onKeyDown={(evt) => onModalOpen(evt, _id)}
    >
      <article className={styles.card}>
        <Counter count={1} size="default" />
        <img className={styles.image} src={link} alt={`Ингредиент: ${name}`} />
        <div className={styles.price}>
          <span>{price}</span>
          <CurrencyIcon />
        </div>
        <h3 className={styles.heading}>{name}</h3>
      </article>
    </div>
  );
}

BurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onSelectedIngredients: PropTypes.func.isRequired,
  onSelectedBun: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default memo(BurgerIngredient);
