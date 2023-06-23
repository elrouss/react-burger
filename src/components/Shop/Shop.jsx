import { useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import styles from './Shop.module.scss';

function Shop() {
  const [ingredientsCounter, setIngredientsCounter] = useState(new Map());

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Соберите бургер</h1>
        <div className={styles.shop}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients ingredientsCounter={ingredientsCounter} />
            <BurgerConstructor
              ingredientsCounter={ingredientsCounter}
              onIngredientsCounter={setIngredientsCounter}
            />
          </DndProvider>
        </div>
      </div>
    </main>
  );
}

export default Shop;
