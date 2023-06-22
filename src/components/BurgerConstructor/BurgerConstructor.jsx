import { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { v4 as uuidv4 } from 'uuid';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from '../../services/features/selected-ingredients/reducer';
import { SAVE_ORDER_DETAILS } from '../../services/features/order-details/reducer';

import {
  getSelectedBun,
  getSelectedIngredients,
} from '../../services/features/selected-ingredients/selectors';

import BurgerBun from './burger-bun/burger-bun';
import SelectedBurgerIngredient from './selected-burger-ingredient/selected-burger-ingredient';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import API from '../../utils/constants';
import DRAG_TYPES from '../../utils/drag-types';

import styles from './BurgerConstructor.module.scss';

let prevBunId = '';

function BurgerConstructor({
  totalPrice,
  ingredientsCounter,
  onIngredientsCounter,
}) {
  const [isOrderDetailsModalOpened, setIsOrderDetailsModalOpened] =
    useState(false);

  const dispatch = useDispatch();

  const selectedBun = useSelector(getSelectedBun);
  const selectedIngredients = useSelector(getSelectedIngredients);

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

  // Selecting ingredients from left container
  // and putting them inside constructor
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
      },
    }),
    [ingredientsCounter]
  );

  const removeIngredient = ({ key, _id }) => {
    dispatch(REMOVE_INGREDIENT({ key }));

    const value = ingredientsCounter.get(_id) - 1;
    onIngredientsCounter(new Map(ingredientsCounter.set(_id, value)));
  };

  // eslint-disable-next-line consistent-return
  async function sendOrder(order) {
    try {
      const res = await fetch(`${API.baseUrl}${API.endpoints.orders}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: order }),
      });

      if (res.ok) {
        const success = await res.json();

        return dispatch(SAVE_ORDER_DETAILS(success));
      }

      return Promise.reject(new Error(`Ошибка ${res.status}`));
    } catch (err) {
      console.error(`Error while sending order data to the server: ${err}`);
    }
  }

  const handleOrder = (evt) => {
    evt.preventDefault();

    if (evt.type === 'click' || evt?.key === 'Enter') {
      const order = [selectedBun, ...selectedIngredients].map(
        (selectedIngredient) => selectedIngredient._id
      );

      sendOrder(order);
      setIsOrderDetailsModalOpened(true);
    }
  };

  const handleModalClose = () => {
    setIsOrderDetailsModalOpened(false);
  };

  return (
    <>
      <section aria-label="Оформление заказа">
        <form className={styles.order} ref={drop}>
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
              <span>{totalPrice.state}</span>
              <CurrencyIcon />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={handleOrder}
            >
              Оформить заказ
            </Button>
          </div>
        </form>
      </section>

      <Modal
        id="order-details"
        isModalOpened={isOrderDetailsModalOpened}
        onModalClose={handleModalClose}
      >
        <OrderDetails />
      </Modal>
    </>
  );
}

BurgerConstructor.propTypes = {
  totalPrice: PropTypes.shape({ state: PropTypes.number.isRequired })
    .isRequired,
  ingredientsCounter: PropTypes.instanceOf(Map).isRequired,
  onIngredientsCounter: PropTypes.func.isRequired,
};

export default BurgerConstructor;
