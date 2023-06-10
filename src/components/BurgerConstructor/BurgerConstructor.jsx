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

function BurgerConstructor({ selectedIngredients, selectedBun, totalPrice }) {
  const ingredients = useContext(IngredientsContext);

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
