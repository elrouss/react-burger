import React from 'react';
import styles from './status.module.scss';

interface IOrdersStatusProps {
  heading: React.ReactElement<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  >;
  orders: number[];
  listColor: 'green' | 'white';
}

const Status = ({ heading, orders, listColor }: IOrdersStatusProps) => {
  const list = orders.map((num) => (
    <li key={num} className={styles.item}>
      {num}
    </li>
  ));

  return (
    <div>
      {heading}
      <ul
        className={`text text_type_digits-default ${styles.list} ${styles[listColor]}`}
      >
        {list}
      </ul>
    </div>
  );
};

export default Status;
