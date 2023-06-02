import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredient.module.scss';

function BurgerIngredient({ name, link, price }) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={link} alt={`Ингредиент: ${name}`} />
      <div className={styles.price}>
        <span>{price}</span>
        <CurrencyIcon />
      </div>
      <h3 className={styles.heading}>{name}</h3>
    </article>
  );
}

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default BurgerIngredient;
