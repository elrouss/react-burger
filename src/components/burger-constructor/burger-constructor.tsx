import { useMemo, useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'services/app/hooks';
import { useDrop } from 'react-dnd';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from 'components/price/price';

import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import sendOrder from 'services/features/order-details/api';
import { isLoading } from 'services/features/order-details/selectors';
import {
  SET_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET,
} from 'services/features/selected-ingredients/slice';

import { checkUserData } from 'services/features/user/selectors';
import {
  getSelectedBun,
  getSelectedIngredients,
} from 'services/features/selected-ingredients/selectors';

import { ROUTES } from 'utils/constants';
import DragTypes from 'utils/types/drag-types';
import { IIngredientWithId } from 'services/features/ingredients/types';
import countTotalPrice from 'utils/calculations/total-price-counter';

import BurgerBun from './selected-burger-bun/selected-burger-bun';
import SelectedBurgerIngredient from './selected-burger-ingredient/selected-burger-ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import styles from './burger-constructor.module.scss';

const BurgerConstructor = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const status = useAppSelector(isLoading);
  const selectedBun = useAppSelector(getSelectedBun);
  const selectedIngredients = useAppSelector(getSelectedIngredients);

  const user = useAppSelector(checkUserData);

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
      accept: DragTypes.Ingredient,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        ingredientTypeDrop: monitor.getItem()?.type,
      }),
      drop: (ingredient: IIngredientWithId) => {
        const data = { ingredient, key: uuidv4() };

        dispatch(
          ingredient.type === 'bun' ? SET_BUN(data) : ADD_INGREDIENT(data)
        );
      },
    }),
    []
  );

  const removeIngredient = ({ key }: { key: string }) => {
    dispatch(REMOVE_INGREDIENT({ key }));
  };

  const handleOrder = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!user) {
      navigate(ROUTES.sign.in);
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (!selectedBun || !selectedIngredients.length || !token) return;

    const order = [selectedBun, ...selectedIngredients, selectedBun].map(
      (selectedIngredient) => selectedIngredient._id
    );

    setIsModalOpened(true);

    dispatch(sendOrder({ order, token }))
      .then((res) => {
        // @ts-ignore
        if (res.payload?.success) dispatch(RESET());
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <section aria-label="Оформление заказа">
        <form
          className={styles.order}
          data-test="constructor"
          ref={drop}
          onSubmit={handleOrder}
        >
          <BurgerBun
            selectedBun={selectedBun}
            isOver={isOver}
            ingredientTypeDrop={ingredientTypeDrop}
            positionRu="верх"
            positionEng="top"
          />

          {(selectedIngredients.length && (
            <div className={`custom-scroll ${styles.components}`}>
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
              className={classNames(styles.componentsEmpty, {
                [styles.containerEmptyDrop]:
                  isOver && ingredientTypeDrop !== 'bun',
              })}
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
            <Price type="total" totalPrice={totalPrice} size="big" />
            <Button
              htmlType={status ? 'button' : 'submit'}
              type="primary"
              size="large"
              disabled={isDisabled}
              onClick={() => setIsModalOpened(true)}
            >
              {status ? 'Подождите...' : 'Оформить заказ'}
            </Button>
          </div>
        </form>
      </section>

      <Modal
        id="order-details"
        isModalOpened={isModalOpened}
        onModalClose={handleModalClose}
      >
        <OrderDetails isPending={status} />
      </Modal>
    </>
  );
};

export default BurgerConstructor;
