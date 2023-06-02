import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import data from '../../utils/data';

import styles from './BurgerIngredients.module.scss';

function BurgerIngredients() {
  const ingredients = [
    { typeRus: 'Булки', typeEng: 'bun' },
    { typeRus: 'Соусы', typeEng: 'sauce' },
    { typeRus: 'Начинки', typeEng: 'main' },
  ];

  return (
    <section>
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          {ingredients.map(({ typeRus }) => (
            <Tab key={typeRus}>{typeRus}</Tab>
          ))}
        </div>
        <div className={styles.ingredients}>
          {ingredients.map(({ typeRus, typeEng }) => (
            <section key={typeEng} className={styles.section}>
              <h2 className={styles.heading}>{typeRus}</h2>
              <div className={styles.content}>
                {data
                  .filter(({ type }) => type === typeEng)
                  .map(({ _id, name, image, price }) => (
                    <BurgerIngredient
                      key={_id}
                      name={name}
                      link={image}
                      price={price}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
