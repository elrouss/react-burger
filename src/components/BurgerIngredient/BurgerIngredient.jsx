import PropTypes from 'prop-types';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredient.module.scss';

function BurgerIngredient({ _id, name, link, price, onModalOpen }) {
  return (
    <div role="button" tabIndex={0} onClick={(evt) => onModalOpen(evt, _id)}>
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
  onModalOpen: PropTypes.func.isRequired,
};

export default BurgerIngredient;
