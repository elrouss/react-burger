import { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { REMOVE_INGREDIENT } from '../../services/features/selectedIngredients/selectedIngredientsReducer';
import { SAVE_ORDER_DETAILS } from '../../services/features/orderDetails/orderDetailsReducer';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import API from '../../utils/constants';

import styles from './BurgerConstructor.module.scss';

function BurgerConstructor({ totalPrice }) {
  const [isOrderDetailsModalOpened, setIsOrderDetailsModalOpened] =
    useState(false);

  const dispatch = useDispatch();

  const selectedBun = useSelector((state) => state.selectedIngredients.bun);
  const selectedIngredients = useSelector(
    (state) => state.selectedIngredients.ingredients
  );

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

  const renderBun = (placeRu, placeEng) =>
    (selectedBun && (
      <ConstructorElement
        extraClass={styles.bun}
        type={placeEng}
        isLocked
        text={`${selectedBun?.name} (${placeRu})`}
        price={selectedBun?.price}
        thumbnail={selectedBun?.image}
      />
    )) || <div className={styles.containerBun} />;

  const handleIngredientRemove = (_id) => {
    dispatch(REMOVE_INGREDIENT({ _id }));
  };

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
        <form className={styles.order}>
          {renderBun('верх', 'top')}

          {(selectedIngredients.length && (
            <div className={styles.components}>
              {selectedIngredients.map(({ _id, name, price, image }) => (
                <div key={`container-${_id}`} className={styles.item}>
                  <DragIcon key={`icon-${_id}`} type="primary" />
                  <ConstructorElement
                    key={_id}
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => handleIngredientRemove(_id)}
                  />
                </div>
              ))}
            </div>
          )) || <div className={styles.componentsEmpty} />}

          {renderBun('низ', 'bottom')}

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
};

export default BurgerConstructor;
