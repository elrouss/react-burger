import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';
import { ADD_INGREDIENT } from '../../services/features/selected-ingredients/reducer';
import {
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from '../../services/features/current-ingredient/reducer';

import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import Modal from '../Modal/Modal';

import styles from './BurgerIngredients.module.scss';

function BurgerIngredients({ onTotalPriceDispatcher }) {
  // TODO: плавная перемотка внутри контейнера к группе ингредиентов кликом по табу
  const [current, setCurrent] = useState('one');
  // const [currentIngredient, setCurrentIngredient] = useState({});
  const [isIngredientDetailsModalOpened, setIsIngredientDetailsModalOpened] =
    useState(false);

  const dispatch = useDispatch();

  const data = [
    { typeRus: 'Булки', typeEng: 'bun', value: 'one' },
    { typeRus: 'Соусы', typeEng: 'sauce', value: 'two' },
    { typeRus: 'Начинки', typeEng: 'main', value: 'three' },
  ];

  const addIngredient = useCallback(
    (ingredient) => {
      dispatch(ADD_INGREDIENT({ ingredient, key: uuidv4() }));

      // if (ingredient.type === 'bun') {
      //   if (selectedBun) {
      //     onTotalPriceDispatcher({
      //       type: 'decrement',
      //       ingredientType: ingredient.type,
      //       price: selectedBun.price,
      //     });
      //   }

      //   return onTotalPriceDispatcher({
      //     type: 'increment',
      //     ingredientType: ingredient.type,
      //     price: ingredient.price,
      //   });
      // }

      // return onTotalPriceDispatcher({
      //   type: 'increment',
      //   ingredientType: ingredient.type,
      //   price: ingredient.price,
      // });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // TODO
  );

  const handleModalOpen = useCallback(
    (evt, ingredient) => {
      if (evt.type === 'click' || evt?.key === 'Enter') {
        dispatch(SHOW_INGREDIENT_DETAILS(ingredient));
        setIsIngredientDetailsModalOpened(true);
      }
    },
    [data] // TODO
  );

  const handleModalClose = () => {
    setIsIngredientDetailsModalOpened(false);
  };

  useEffect(() => {
    if (isIngredientDetailsModalOpened) return;

    // Time is the same as the animation of modals' appearing
    setTimeout(() => dispatch(RESET_INGREDIENT_DETAILS()), 300);
  }, [isIngredientDetailsModalOpened]);

  return (
    <>
      <section aria-label="Ингредиенты бургера">
        <div className={styles.wrapper}>
          <div className={styles.tabs}>
            {data.map(({ typeRus, typeEng, value }) => (
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
            {data.map(({ typeRus, typeEng, value }) => (
              <BurgerIngredientsSection
                key={typeEng}
                typeRus={typeRus}
                typeEng={typeEng}
                value={value}
                // onAddIngredient={addIngredient}
                onModalOpen={handleModalOpen}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal
        id="ingredient-details"
        isModalOpened={isIngredientDetailsModalOpened}
        onModalClose={handleModalClose}
      >
        <IngredientDetails />
      </Modal>
    </>
  );
}

BurgerIngredients.propTypes = {
  onTotalPriceDispatcher: PropTypes.func.isRequired,
};

export default BurgerIngredients;
