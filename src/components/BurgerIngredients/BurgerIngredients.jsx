import { useCallback, useRef, useEffect, useState } from 'react';
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

function BurgerIngredients({ ingredientsCounter }) {
  const [currentTab, setCurrentTab] = useState('one');
  const [isIngredientDetailsModalOpened, setIsIngredientDetailsModalOpened] =
    useState(false);

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
