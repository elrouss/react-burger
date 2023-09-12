import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './shop.module.scss';

const Shop = () => (
  <main className={styles.main}>
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Соберите бургер</h1>
      <div className={styles.shop}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  </main>
);

export default Shop;
