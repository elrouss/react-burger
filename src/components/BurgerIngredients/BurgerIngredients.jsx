import { useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import data from '../../utils/data';

import styles from './BurgerIngredients.module.scss';

function BurgerIngredients() {
  // TODO: плавная перемотка внутри контейнера к группе ингредиентов кликом по табу
  const [current, setCurrent] = useState('one');

  const ingredients = [
    { typeRus: 'Булки', typeEng: 'bun', value: 'one' },
    { typeRus: 'Соусы', typeEng: 'sauce', value: 'two' },
    { typeRus: 'Начинки', typeEng: 'main', value: 'three' },
  ];

  return (
    <section>
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          {ingredients.map(({ typeRus, typeEng, value }) => (
            <a key={`link-${typeEng}`} href={`#${value}`}>
              <Tab
                key={`tab-${typeEng}`}
                value={value}
                active={current === value}
                onClick={setCurrent}
              >
                {typeRus}
              </Tab>
            </a>
          ))}
        </div>
        <div className={styles.ingredients}>
          {ingredients.map(({ typeRus, typeEng, value }) => (
            <section key={typeEng} className={styles.section}>
              <h2 className={styles.heading} id={value}>
                {typeRus}
              </h2>
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
