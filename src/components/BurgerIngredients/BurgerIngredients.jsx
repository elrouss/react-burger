import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import {
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from '../../services/features/current-ingredient/reducer';

import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import Modal from '../Modal/Modal';

import styles from './BurgerIngredients.module.scss';

const table = [
  { typeRus: 'Булки', typeEng: 'bun', value: 'one' },
  { typeRus: 'Соусы', typeEng: 'sauce', value: 'two' },
  { typeRus: 'Начинки', typeEng: 'main', value: 'three' },
];

function BurgerIngredients({ ingredientsCounter }) {
  // TODO: плавная перемотка внутри контейнера к группе ингредиентов кликом по табу
  const [current, setCurrent] = useState('one');
  const [isIngredientDetailsModalOpened, setIsIngredientDetailsModalOpened] =
    useState(false);

  const dispatch = useDispatch();

  const handleModalOpen = useCallback(
    (evt, ingredient) => {
      if (evt.type === 'click' || evt?.key === 'Enter') {
        dispatch(SHOW_INGREDIENT_DETAILS(ingredient));
        setIsIngredientDetailsModalOpened(true);
      }
    },
    [table] // TODO
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
            {table.map(({ typeRus, typeEng, value }) => (
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
            {table.map(({ typeRus, typeEng, value }) => (
              <BurgerIngredientsSection
                key={typeEng}
                typeRus={typeRus}
                typeEng={typeEng}
                value={value}
                onModalOpen={handleModalOpen}
                ingredientsCounter={ingredientsCounter}
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
  ingredientsCounter: PropTypes.instanceOf(Map).isRequired,
};

export default BurgerIngredients;
