import { useCallback, useEffect, useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './BurgerIngredients.module.scss';

function BurgerIngredients({ data }) {
  // TODO: плавная перемотка внутри контейнера к группе ингредиентов кликом по табу
  const [current, setCurrent] = useState('one');
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [isIngredientDetailsModalOpened, setIsIngredientDetailsModalOpened] =
    useState(false);

  const ingredients = [
    { typeRus: 'Булки', typeEng: 'bun', value: 'one' },
    { typeRus: 'Соусы', typeEng: 'sauce', value: 'two' },
    { typeRus: 'Начинки', typeEng: 'main', value: 'three' },
  ];

  const handleModalOpen = useCallback(
    (evt, id) => {
      if (evt.type === 'click' || evt?.key === 'Enter') {
        const desired = data.find((ingredient) => ingredient._id === id);

        setCurrentIngredient(desired);
        setIsIngredientDetailsModalOpened(true);
      }
    },
    [data]
  );

  const handleModalClose = () => {
    setIsIngredientDetailsModalOpened(false);
  };

  useEffect(() => {
    if (isIngredientDetailsModalOpened) return;

    // Time is the same as the animation of modals' appearing
    setTimeout(() => setCurrentIngredient({}), 300);
  }, [isIngredientDetailsModalOpened]);

  return (
    <>
      <section aria-label="Ингредиенты бургера">
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
              <section
                key={typeEng}
                className={styles.section}
                aria-label={typeRus}
              >
                <h2 className={styles.heading} id={value}>
                  {typeRus}
                </h2>
                <div className={styles.content}>
                  {data
                    .filter(({ type }) => type === typeEng)
                    .map(({ _id, name, image, price }) => (
                      <BurgerIngredient
                        key={_id}
                        _id={_id}
                        name={name}
                        link={image}
                        price={price}
                        onModalOpen={handleModalOpen}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <IngredientDetails
        id="ingredient-details"
        currentIngredient={currentIngredient}
        isModalOpened={isIngredientDetailsModalOpened}
        onModalClose={handleModalClose}
      />
    </>
  );
}

BurgerIngredients.propTypes = ingredientsTypes;

export default BurgerIngredients;
