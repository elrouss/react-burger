import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import styles from './Shop.module.scss';

function Shop() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Соберите бургер</h1>
        <BurgerIngredients />
      </div>
    </main>
  );
}

export default Shop;
