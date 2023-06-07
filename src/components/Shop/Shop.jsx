import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './Shop.module.scss';

function Shop(props) {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Соберите бургер</h1>
        <div className={styles.shop}>
          <BurgerIngredients {...props} />
          <BurgerConstructor {...props} />
        </div>
      </div>
    </main>
  );
}

Shop.propTypes = ingredientsTypes;

export default Shop;
