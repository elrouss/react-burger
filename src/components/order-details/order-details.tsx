import NewOrderPending from './components/new-order-pending/new-order-pending';
import NewOrderFulfilled from './components/new-order-fulfilled/new-order-fulfilled';
import styles from './order-details.module.scss';

interface IOrderDetailsProps {
  isPending: boolean;
}

const OrderDetails = ({ isPending }: IOrderDetailsProps) => (
  <div className={styles.wrapper} data-test="order-details">
    {isPending ? <NewOrderPending /> : <NewOrderFulfilled />}
    <p className={styles.paragraph}>
      {isPending ? 'Ваш заказ начали готовить' : 'Ваш заказ готов'}
    </p>
    <p className={styles.waiting}>
      {isPending ? 'Дождитесь его номера' : 'Приятного аппетита!'}
    </p>
  </div>
);

export default OrderDetails;
