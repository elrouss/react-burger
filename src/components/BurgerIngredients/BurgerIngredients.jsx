import { useContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientsContext from '../../contexts/IngredientsContext';
import SelectedIngredientsContext from '../../contexts/SelectedIngredientsContext';

import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import Modal from '../Modal/Modal';

import styles from './BurgerIngredients.module.scss';

function BurgerIngredients({ onTotalPriceDispatcher }) {
  // TODO: плавная перемотка внутри контейнера к группе ингредиентов кликом по табу
  const { ingredients } = useContext(IngredientsContext);
  const {
    selectedIngredientsState: { selectedBun, selectedIngredients },
    selectedIngredientsDispatcher: onSelectedIngredientsDispatcher,
  } = useContext(SelectedIngredientsContext);

  const [current, setCurrent] = useState('one');
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [isIngredientDetailsModalOpened, setIsIngredientDetailsModalOpened] =
    useState(false);

  const data = [
    { typeRus: 'Булки', typeEng: 'bun', value: 'one' },
    { typeRus: 'Соусы', typeEng: 'sauce', value: 'two' },
    { typeRus: 'Начинки', typeEng: 'main', value: 'three' },
  ];

  const addIngredient = useCallback(
    (_id, name, type, image, price) => {
      if (selectedIngredients.find((ingredient) => ingredient._id === _id))
        return undefined;

      onSelectedIngredientsDispatcher({
        action: 'add',
        _id,
        name,
        type,
        image,
        price,
      });

      if (type === 'bun') {
        if (selectedBun) {
          onTotalPriceDispatcher({
            type: 'decrement',
            ingredientType: type,
            price: selectedBun.price,
          });
        }

        return onTotalPriceDispatcher({
          type: 'increment',
          ingredientType: type,
          price,
        });
      }

      return onTotalPriceDispatcher({
        type: 'increment',
        ingredientType: type,
        price,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedIngredients, selectedBun]
  );

  const handleModalOpen = useCallback(
    (evt, id) => {
      if (evt.type === 'click' || evt?.key === 'Enter') {
        setCurrentIngredient(ingredients.find(({ _id }) => _id === id));
        setIsIngredientDetailsModalOpened(true);
      }
    },
    [ingredients]
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
                onAddIngredient={addIngredient}
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
        <IngredientDetails currentIngredient={currentIngredient} />
      </Modal>
    </>
  );
}

BurgerIngredients.propTypes = {
  onTotalPriceDispatcher: PropTypes.func.isRequired,
};

export default BurgerIngredients;
