import { useContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientsContext from '../../contexts/IngredientsContext';
import SelectedIngredientsContext from '../../contexts/SelectedIngredientsContext';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import styles from './BurgerIngredients.module.scss';

function BurgerIngredients({ onTotalPriceDispatcher }) {
  // TODO: плавная перемотка внутри контейнера к группе ингредиентов кликом по табу
  const data = useContext(IngredientsContext);
  const {
    selectedIngredientsState: { selectedBun, selectedIngredients },
    selectedIngredientsDispatcher: onSelectedIngredientsDispatcher,
  } = useContext(SelectedIngredientsContext);

  const [current, setCurrent] = useState('one');
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [isIngredientDetailsModalOpened, setIsIngredientDetailsModalOpened] =
    useState(false);

  const ingredients = [
    { typeRus: 'Булки', typeEng: 'bun', value: 'one' },
    { typeRus: 'Соусы', typeEng: 'sauce', value: 'two' },
    { typeRus: 'Начинки', typeEng: 'main', value: 'three' },
  ];

  const addIngredient = (_id, name, type, image, price) => {
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
  };

  const handleModalOpen = useCallback(
    (evt, id) => {
      if (evt.type === 'click' || evt?.key === 'Enter') {
        setCurrentIngredient(data.find(({ _id }) => _id === id));
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
                    .map(({ _id, name, type, image, price }) => (
                      <BurgerIngredient
                        key={_id}
                        _id={_id}
                        name={name}
                        type={type}
                        link={image}
                        price={price}
                        onAddIngredient={addIngredient}
                        onModalOpen={handleModalOpen}
                      />
                    ))}
                </div>
              </section>
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
