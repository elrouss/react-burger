import classNames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.scss';

type TPriceMutual = {
  size: 'big' | 'small';
};

type TTotalPrice = TPriceMutual & {
  type: 'total';
  totalPrice: number;
};

type TItemPrice = TPriceMutual & {
  type: 'item';
  number: number;
  price: number;
};

type TPriceProps = TTotalPrice | TItemPrice;
const Price = (props: TPriceProps) => {
  const { type, size } = props;

  if (type === 'total') {
    const { totalPrice } = props;

    return (
      <div
        className={classNames(
          `text text_type_digits-${size === 'big' ? 'medium' : 'default'} ${
            styles.price
          }`,
          { [styles.bigIcon]: size === 'big' }
        )}
      >
        <span data-test="total-price">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
    );
  }

  const { number, price } = props;

  return (
    <div
      className={classNames(
        `text text_type_digits-${size === 'big' ? 'medium' : 'default'} ${
          styles.price
        }`,
        { [styles.bigIcon]: size === 'big' }
      )}
    >
      <span>{`${number} x ${price}`}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Price;
