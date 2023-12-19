import { useAppSelector } from 'services/app/hooks';
import { getCurrentOrderNumber } from 'services/features/order-details/selectors';
import orderAccepted from 'assets/icons/order-accepted.svg';
import styles from './new-order-fulfilled.module.scss';

const NewOrderFulfilled = () => {
  const currentOrderNumber = useAppSelector(getCurrentOrderNumber);

  return (
    <>
      <span className={styles.order} data-test="order-number">
        {currentOrderNumber}
      </span>
      <h3 className={styles.heading}>идентификатор заказа</h3>
      <img
        className={styles.image}
        src={orderAccepted}
        alt="Три фиолетовых круга с белой галочкой в центре"
      />
    </>
  );
};

export default NewOrderFulfilled;
