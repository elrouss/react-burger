import { useState } from 'react';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../OrderDetails/OrderDetails';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './BurgerConstructor.module.scss';

function BurgerConstructor({ data }) {
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
      <section>
        <form className={styles.order}>
          <ConstructorElement
            extraClass={styles.bun}
            type="top"
            isLocked
            text={`${data[0]?.name} (верх)`}
            price={data[0]?.price}
            thumbnail={data[0]?.image}
          />
          <div className={styles.components}>
            {data
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
            text={`${data[0]?.name} (низ)`}
            price={data[0]?.price}
            thumbnail={data[0]?.image}
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
              onClick={(evt) => handleModalOpen(evt)}
            >
              Оформить заказ
            </Button>
          </div>
        </form>
      </section>

      <OrderDetails
        isModalOpened={isOrderDetailsModalOpened}
        onModalClose={handleModalClose}
      />
    </>
  );
}

BurgerConstructor.propTypes = ingredientsTypes;

export default BurgerConstructor;
