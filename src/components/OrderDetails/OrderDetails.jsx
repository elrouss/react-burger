import orderAccepted from '../../assets/icons/order-accepted.svg';

import styles from './OrderDetails.module.scss';

function OrderDetails({ currentOrder }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.order}>{currentOrder?.order?.number}</span>
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
}

export default OrderDetails;
