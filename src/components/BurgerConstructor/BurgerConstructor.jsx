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

import styles from './BurgerConstructor.module.scss';

function BurgerConstructor() {
  const ingredients = useContext(IngredientsContext);

  const [isOrderDetailsModalOpened, setIsOrderDetailsModalOpened] =
    useState(false);

  const handleModalOpen = (evt) => {
    evt.preventDefault();

    if (evt.type === 'click' || evt?.key === 'Enter') {
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
          <ConstructorElement
            extraClass={styles.bun}
            type="top"
            isLocked
            text={`${ingredients[0]?.name} (верх)`}
            price={ingredients[0]?.price}
            thumbnail={ingredients[0]?.image}
          />
          <div className={styles.components}>
            {ingredients
              .filter(({ type }) => type !== 'bun')
              .map(({ _id, name, price, image }) => (
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
          <ConstructorElement
            extraClass={styles.bun}
            type="bottom"
            isLocked
            text={`${ingredients[0]?.name} (низ)`}
            price={ingredients[0]?.price}
            thumbnail={ingredients[0]?.image}
          />
          <div className={styles.info}>
            <div className={styles.price}>
              <span>610</span>
              <CurrencyIcon />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={handleModalOpen}
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

export default BurgerConstructor;
