import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';

import orderAccepted from '../../assets/icons/order-accepted.svg';

import styles from './OrderDetails.module.scss';

function OrderDetails(props) {
  return (
    <Modal {...props}>
      <div className={styles.wrapper}>
        <span className={styles.order}>034536</span>
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
    </Modal>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.string.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default OrderDetails;
