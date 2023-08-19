import { useAppSelector } from 'services/app/hooks';
import { getCurrentOrderNumber } from '../../services/features/order-details/selectors';
import orderAccepted from '../../assets/icons/order-accepted.svg';
import styles from './order-details.module.scss';

const OrderDetails = () => {
  const currentOrderNumber = useAppSelector(getCurrentOrderNumber);

  return (
    <div className={styles.wrapper}>
      <span className={styles.order}>{currentOrderNumber}</span>
      <h3 className={styles.heading}>идентификатор заказа</h3>
      <img
        className={styles.image}
        src={orderAccepted}
        alt="Три фиолетовых круга с белой галочкой в центре"
      />
      <p className={styles.paragraph}>Ваш заказ начали готовить</p>
      <p className={styles.waiting}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
