import { useEffect } from 'react';
import { useAppDispatch } from 'services/app/hooks';
import {
  connect as connectLiveOrderFeed,
  disconnect as disconnectLiveOrderFeed,
} from 'services/features/live-order-feed/actions';
import {
  connectProfile,
  disconnectProfile,
} from 'services/features/profile-live-order-feed/actions';
import AppHeader from 'components/app-header/app-header';
import OrderInfo from 'components/order-info/order-info';
import { WEBSOCKET } from 'utils/constants';
import styles from './order-details.module.scss';

const OrderDetailsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const wsOrdersAll = `${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`;
    let wsOrdersProfile: string | undefined;

    const jwt = localStorage.getItem('accessToken');
    if (jwt) {
      wsOrdersProfile = `${WEBSOCKET.baseUrl}${
        WEBSOCKET.endpoints.ordersPersonal
      }?token=${localStorage.getItem('accessToken')}`;

      dispatch(connectProfile(wsOrdersProfile));
    }

    dispatch(connectLiveOrderFeed(wsOrdersAll));

    return () => {
      dispatch(disconnectLiveOrderFeed()) as unknown as void;
      dispatch(disconnectProfile()) as unknown as void;
    };
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <OrderInfo orderNumPosition="center" isSinglePage />
      </main>
    </>
  );
};

export default OrderDetailsPage;
