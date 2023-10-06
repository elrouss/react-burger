import AppHeader from 'components/app-header/app-header';
import Orders from './components/orders/orders';
import styles from './feed.module.scss';

const FeedPage = () => (
  <>
    <AppHeader />
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Лента заказов</h1>
        <div className={styles.gallery}>
          <Orders />
          <div className={styles.statistics}>will be soon</div>
        </div>
      </div>
    </main>
  </>
);

export default FeedPage;
