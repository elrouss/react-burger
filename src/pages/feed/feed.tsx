import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'services/app/hooks';
import {
  connect as connectLiveOrderFeed,
  disconnect as disconnectLiveOrderFeed,
} from 'services/features/live-order-feed/actions';
import { getLiveOrderFeedData } from 'services/features/live-order-feed/selectors';
import AppHeader from 'components/app-header/app-header';
import Orders from 'components/orders/orders';
import Statistics from 'components/statistics/statistics';
import Preloader from 'components/preloader/preloader';
import { ROUTES, WEBSOCKET } from 'utils/constants';
import styles from './feed.module.scss';

const FeedPage = () => {
  const dispatch = useAppDispatch();

  const wsOrdersAll = `${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`;

  useEffect(() => {
    dispatch(connectLiveOrderFeed(wsOrdersAll));

    return () => dispatch(disconnectLiveOrderFeed()) as unknown as void;
  }, []);

  const orders = useAppSelector(getLiveOrderFeedData);

  return (
    <>
      <AppHeader />
      {orders ? (
        <main>
          <div className={styles.wrapper}>
            <h1 className={styles.heading}>Лента заказов</h1>
            <div className={styles.gallery}>
              <Orders
                ordersData={orders}
                dynamicParentRoute={ROUTES.orders}
                haveStatus={false}
              />
              <Statistics />
            </div>
          </div>
        </main>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default FeedPage;
