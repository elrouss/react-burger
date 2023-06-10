import { useReducer, useState } from 'react';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import styles from './Shop.module.scss';

const initialTotalPrice = { state: 0 };

function reducer({ state }, { type, ingredientType, price }) {
  switch (type) {
    case 'increment':
      return ingredientType === 'bun'
        ? { state: state + price * 2 }
        : { state: state + price };
    case 'decrement':
      return ingredientType === 'bun'
        ? { state: state - price * 2 }
        : { state: state - price };
    case 'reset':
      return initialTotalPrice;
    default:
      throw new Error(`Wrong type of action: ${type}`);
  }
}

function Shop() {
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducer,
    initialTotalPrice
  );

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBun, setSelectedBun] = useState({});

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Соберите бургер</h1>
        <div className={styles.shop}>
          <BurgerIngredients
            selectedIngredients={selectedIngredients}
            selectedBun={selectedBun}
            onSelectedIngredients={setSelectedIngredients}
            onSelectedBun={setSelectedBun}
            onTotalPriceDispatcher={totalPriceDispatcher}
          />
          <BurgerConstructor
            selectedIngredients={selectedIngredients}
            selectedBun={selectedBun}
            totalPrice={totalPriceState}
          />
        </div>
      </div>
    </main>
  );
}

export default Shop;
