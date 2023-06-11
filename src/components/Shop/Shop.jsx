import { useReducer } from 'react';

import {
  initialTotalPrice,
  reducerTotalPrice,
} from '../../utils/reducers/reducerTotalPrice';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import styles from './Shop.module.scss';

function Shop() {
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducerTotalPrice,
    initialTotalPrice
  );

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Соберите бургер</h1>
        <div className={styles.shop}>
          <BurgerIngredients onTotalPriceDispatcher={totalPriceDispatcher} />
          <BurgerConstructor totalPrice={totalPriceState} />
        </div>
      </div>
    </main>
  );
}

export default Shop;
