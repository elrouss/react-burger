import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import {
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from '../../services/features/current-ingredient/reducer';

import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import IngredientDetails from '../ingredient-details/ingredient-details';

import Modal from '../modal/modal';

import styles from './burger-ingredients.module.scss';

function BurgerIngredients({ ingredientsCounter }) {
  const [currentTab, setCurrentTab] = useState('one');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const tabsRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null);

  const dispatch = useDispatch();

  const table = [
    { typeRus: 'Булки', typeEng: 'bun', value: 'one', ref: bunsRef },
    { typeRus: 'Соусы', typeEng: 'sauce', value: 'two', ref: saucesRef },
    { typeRus: 'Начинки', typeEng: 'main', value: 'three', ref: mainRef },
  ];

  const scrollTabIntoView = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const handleTabsScroll = () => {
    const DESIRED_SPACE_DIFFERENCE_START = 112;

    const TABS_BOTTOM_EDGE_VALUE =
      tabsRef.current.getBoundingClientRect().bottom;
    const BUNS_TOP_EDGE_VALUE = bunsRef.current.getBoundingClientRect().top;
    const SAUCES_TOP_EDGE_VALUE = saucesRef.current.getBoundingClientRect().top;
    const MAIN_TOP_EDGE_VALUE = mainRef.current.getBoundingClientRect().top;

    const [buns, sauces, main] = table;

    const setTabValue = (sectionValue, selectedTab) => {
      if (
        sectionValue - TABS_BOTTOM_EDGE_VALUE <=
        DESIRED_SPACE_DIFFERENCE_START
      ) {
        setCurrentTab(selectedTab);
      }
    };

    setTabValue(BUNS_TOP_EDGE_VALUE, buns.value);
    setTabValue(SAUCES_TOP_EDGE_VALUE, sauces.value);
    setTabValue(MAIN_TOP_EDGE_VALUE, main.value);
  };

  const handleModalOpen = useCallback((evt, ingredient) => {
    if (evt.type === 'click' || evt?.key === 'Enter') {
      dispatch(SHOW_INGREDIENT_DETAILS(ingredient));
      setIsModalOpened(true);
    }
  }, []);

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  const resetModalData = () => {
    if (isModalOpened) return;

    dispatch(RESET_INGREDIENT_DETAILS());
  };

  return (
    <>
      <section aria-label="Ингредиенты бургера">
        <div className={styles.wrapper}>
          <div className={styles.tabs} ref={tabsRef}>
            {table.map(({ typeRus, typeEng, value, ref }) => (
              <Tab
                key={`tab-${typeEng}`}
                active={currentTab === value}
                onClick={() => scrollTabIntoView(ref)}
              >
                {typeRus}
              </Tab>
            ))}
          </div>
          <div className={styles.ingredients} onScroll={handleTabsScroll}>
            {table.map(({ typeRus, typeEng, ref }) => (
              <BurgerIngredientsSection
                key={typeEng}
                ref={ref}
                typeRus={typeRus}
                typeEng={typeEng}
                ingredientsCounter={ingredientsCounter}
                onModalOpen={handleModalOpen}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal
        id="ingredient-details"
        isModalOpened={isModalOpened}
        onModalClose={handleModalClose}
        onResetData={resetModalData}
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
