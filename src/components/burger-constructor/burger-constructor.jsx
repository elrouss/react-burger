import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { v4 as uuidv4 } from 'uuid';

import { sendOrder } from '../../services/features/order-details/reducer';
import { isLoading } from '../../services/features/order-details/selectors';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from '../../services/features/selected-ingredients/reducer';

import {
  getSelectedBun,
  getSelectedIngredients,
} from '../../services/features/selected-ingredients/selectors';

import BurgerBun from './selected-burger-bun/selected-burger-bun';
import SelectedBurgerIngredient from './selected-burger-ingredient/selected-burger-ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import DRAG_TYPES from '../../utils/drag-types';

import styles from './burger-constructor.module.scss';

let prevBunId = '';

function BurgerConstructor({ ingredientsCounter, onIngredientsCounter }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [prevBunPrice, setPrevBunPrice] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  const status = useSelector(isLoading);
  const selectedBun = useSelector(getSelectedBun);
  const selectedIngredients = useSelector(getSelectedIngredients);

  useEffect(() => {
    setIsDisabled(!selectedBun || !selectedIngredients.length);
  }, [selectedBun, selectedIngredients]);

  const incrementIngredientCounter = ({ _id, type }) => {
    let value = ingredientsCounter.get(_id);

    if (type === 'bun' && value) return 2;

    if (type === 'bun') {
      ingredientsCounter.set(prevBunId, 0);
      prevBunId = _id;

      return 2;
    }

    value = value ? (value += 1) : 1;
    return value;
  };

  const onIncrementTotalPrice = ({ type, price }) => {
    if (type === 'bun') {
      const bunPrice = price * 2;

      if (prevBunPrice) {
        setTotalPrice(totalPrice - prevBunPrice + bunPrice);
        setPrevBunPrice(bunPrice);
      } else {
        setTotalPrice(totalPrice + bunPrice);
        setPrevBunPrice(bunPrice);
      }
    } else {
      setTotalPrice(totalPrice + price);
    }
  };

  const onDecrementTotalPrice = (price) => {
    setTotalPrice(totalPrice - price);
  };

  // Selecting ingredients from left container
  // and putting them inside the constructor
  const [{ isOver, ingredientTypeDrop }, drop] = useDrop(
    () => ({
      accept: DRAG_TYPES.INGREDIENT,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        ingredientTypeDrop: monitor.getItem()?.type,
      }),
      drop: (ingredient) => {
        dispatch(ADD_INGREDIENT({ ingredient, key: uuidv4() }));

        onIngredientsCounter(
          new Map(
            ingredientsCounter.set(
              ingredient._id,
              incrementIngredientCounter(ingredient)
            )
          )
        );

        onIncrementTotalPrice(ingredient);
      },
    }),
    [ingredientsCounter]
  );

  const removeIngredient = ({ key, _id, price }) => {
    dispatch(REMOVE_INGREDIENT({ key }));

    const value = ingredientsCounter.get(_id) - 1;

    onIngredientsCounter(new Map(ingredientsCounter.set(_id, value)));
    onDecrementTotalPrice(price);
  };

  const handleOrder = (evt) => {
    evt.preventDefault();

    const order = [selectedBun, ...selectedIngredients].map(
      (selectedIngredient) => selectedIngredient._id
    );

    dispatch(sendOrder(order));
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <section aria-label="Оформление заказа">
        <form className={styles.order} ref={drop} onSubmit={handleOrder}>
          <BurgerBun
            selectedBun={selectedBun}
            isOver={isOver}
            ingredientTypeDrop={ingredientTypeDrop}
            positionRu="верх"
            positionEng="top"
          />

          {(selectedIngredients.length && (
            <div className={styles.components}>
              {selectedIngredients.map((ingredient, index) => (
                <SelectedBurgerIngredient
                  key={`component-${ingredient.key}`}
                  ingredient={ingredient}
                  index={index}
                  removeIngredient={() => removeIngredient(ingredient)}
                />
              ))}
            </div>
          )) || (
            <div
              className={`${styles.componentsEmpty}${
                (isOver &&
                  ingredientTypeDrop !== 'bun' &&
                  ` ${styles.containerEmptyDrop}`) ||
                ''
              }`}
            >
              <span>Перетащите начинку</span>
            </div>
          )}

          <BurgerBun
            selectedBun={selectedBun}
            isOver={isOver}
            ingredientTypeDrop={ingredientTypeDrop}
            positionRu="низ"
            positionEng="bottom"
          />

          <div className={styles.info}>
            <div className={styles.price}>
              <span>{totalPrice}</span>
              <CurrencyIcon />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              disabled={isDisabled}
            >
              {status ? 'Подождите...' : 'Оформить заказ'}
            </Button>
          </div>
        </form>
      </section>

      <Modal
        id="order-details"
        onLoading={status}
        isModalOpened={isModalOpened}
        onModalClose={handleModalClose}
      >
        <OrderDetails />
      </Modal>
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredientsCounter: PropTypes.instanceOf(Map).isRequired,
  onIngredientsCounter: PropTypes.func.isRequired,
};

export default BurgerConstructor;
