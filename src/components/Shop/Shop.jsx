import { useState } from 'react';

import IngredientsContext from '../../contexts/IngredientsContext';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './Shop.module.scss';

function Shop({ data }) {
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
            onSelectedIngredients={setSelectedIngredients}
            onSelectedBun={setSelectedBun}
          />
          <IngredientsContext.Provider value={data}>
            <BurgerConstructor
              selectedIngredients={selectedIngredients}
              selectedBun={selectedBun}
            />
          </IngredientsContext.Provider>
        </div>
      </div>
    </main>
  );
}

Shop.propTypes = ingredientsTypes;

export default Shop;
