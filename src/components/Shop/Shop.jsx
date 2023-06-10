import { useReducer, useState } from 'react';

import IngredientsContext from '../../contexts/IngredientsContext';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import ingredientsTypes from '../../utils/types/ingredients';

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

function Shop({ data }) {
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
            data={data}
            selectedIngredients={selectedIngredients}
            selectedBun={selectedBun}
            onSelectedIngredients={setSelectedIngredients}
            onSelectedBun={setSelectedBun}
            onTotalPriceDispatcher={totalPriceDispatcher}
          />
          <IngredientsContext.Provider value={data}>
            <BurgerConstructor
              selectedIngredients={selectedIngredients}
              selectedBun={selectedBun}
              totalPrice={totalPriceState}
            />
          </IngredientsContext.Provider>
        </div>
      </div>
    </main>
  );
}

Shop.propTypes = ingredientsTypes;

export default Shop;
