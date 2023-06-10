import { useContext, useState } from 'react';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientsContext from '../../contexts/IngredientsContext';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import API from '../../utils/constants';

import styles from './BurgerConstructor.module.scss';

// eslint-disable-next-line consistent-return
async function sendOrder(order, saveOrderNum) {
  try {
    const res = await fetch(API.order, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: order }),
    });

    if (res.ok) {
      const success = await res.json();

      return saveOrderNum(success);
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  } catch (err) {
    console.error(`Ошибка в процессе отправки данных заказа на сервер: ${err}`);
  }
}

function BurgerConstructor({ selectedIngredients, selectedBun, totalPrice }) {
  const ingredients = useContext(IngredientsContext);

  const [currentOrder, setCurrentOrder] = useState({});
  const [isOrderDetailsModalOpened, setIsOrderDetailsModalOpened] =
    useState(false);

  const renderBun = (placeRu, placeEng) => {
    return (
      (Object.keys(selectedBun).length && (
        <ConstructorElement
          extraClass={styles.bun}
          type={placeEng}
          isLocked
          text={`${selectedBun.name} (${placeRu})`}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
      )) || <div className={styles.containerBun} />
    );
  };

  const handleOrder = (evt) => {
    evt.preventDefault();

    if (evt.type === 'click' || evt?.key === 'Enter') {
      const order = [selectedBun, ...selectedIngredients].map(
        (selectedIngredient) => selectedIngredient._id
      );

      sendOrder(order, setCurrentOrder);
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
        <OrderDetails currentOrder={currentOrder} />
      </Modal>
    </>
  );
}

export default BurgerConstructor;
