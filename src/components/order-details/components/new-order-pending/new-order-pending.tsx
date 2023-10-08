/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import orderPendingImage from 'assets/images/cosmic.gif';
import styles from './new-order-pending.module.scss';

const NewOrderPending = () => {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      <img
        className={styles.image}
        src={orderPendingImage}
        alt="Вращающийся бургер"
      />
      <span className={`text text_type_main-medium ${styles.counter}`}>
        {seconds}
      </span>
    </>
  );
};

export default NewOrderPending;
