import AppHeader from 'components/app-header/app-header';
import OrderInfo from 'components/order-info/order-info';
import styles from './order-details.module.scss';

const OrderDetailsPage = () => (
  <>
    <AppHeader />
    <main className={styles.main}>
      <OrderInfo orderNumPosition="center" />
    </main>
  </>
);

export default OrderDetailsPage;
