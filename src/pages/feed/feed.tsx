import AppHeader from 'components/app-header/app-header';
import Orders from 'components/orders/orders';
import Statistics from 'components/statistics/statistics';
import { ROUTES } from 'utils/constants';
import styles from './feed.module.scss';

const FeedPage = () => (
  <>
    <AppHeader />
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Лента заказов</h1>
        <div className={styles.gallery}>
          <Orders dynamicParentRoute={ROUTES.orders} haveStatus={false} />
          <Statistics />
        </div>
      </div>
    </main>
  </>
);

export default FeedPage;
