import { useEffect, useState } from 'react';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './BurgerConstructor.module.scss';

function BurgerConstructor({ data }) {
  let sum = 0;

  const [totalPrice, setTotalPrice] = useState(sum);

  useEffect(() => {
    setTotalPrice(sum);
  }, [sum]);

  return (
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
            .map(({ _id, name, price, image }) => {
              sum += price;

              return (
                <div key={`container-${_id}`} className={styles.item}>
                  <DragIcon key={`icon-${_id}`} type="primary" />
                  <ConstructorElement
                    key={_id}
                    text={name}
                    price={price}
                    thumbnail={image}
                  />
                </div>
              );
            })}
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
            <span>{totalPrice}</span>
            <CurrencyIcon />
          </div>
          <Button htmlType="submit" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </form>
    </section>
  );
}

BurgerConstructor.propTypes = ingredientsTypes;

export default BurgerConstructor;
