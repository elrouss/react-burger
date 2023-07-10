import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import { checkUserData } from '../../services/features/user/selectors';
import {
  getSelectedBun,
  getSelectedIngredients,
} from '../../services/features/selected-ingredients/selectors';

import BurgerBun from './selected-burger-bun/selected-burger-bun';
import SelectedBurgerIngredient from './selected-burger-ingredient/selected-burger-ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { ROUTES } from '../../utils/constants';
import DRAG_TYPES from '../../utils/drag-types';
import countTotalPrice from '../../utils/calculations/total-price-counter';

import styles from './burger-constructor.module.scss';

function BurgerConstructor() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector(isLoading);
  const selectedBun = useSelector(getSelectedBun);
  const selectedIngredients = useSelector(getSelectedIngredients);

  const user = useSelector(checkUserData);

  const totalPrice = useMemo(
    () =>
      countTotalPrice('bun', selectedBun) +
      countTotalPrice('ingredients', selectedIngredients),
    [selectedBun, selectedIngredients]
  );

  useEffect(() => {
    setIsDisabled(!selectedBun || !selectedIngredients.length);
  }, [selectedBun, selectedIngredients]);

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
      },
    }),
    []
  );

  const removeIngredient = ({ key }) => {
    dispatch(REMOVE_INGREDIENT({ key }));
  };

  const handleOrder = (evt) => {
    evt.preventDefault();

    if (!user) {
      navigate(ROUTES.sign.in);
    } else {
      const order = [selectedBun, ...selectedIngredients].map(
        (selectedIngredient) => selectedIngredient._id
      );

      dispatch(sendOrder(order));
      setIsModalOpened(true);
    }
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

export default BurgerConstructor;
