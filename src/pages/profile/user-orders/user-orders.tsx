import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'services/app/hooks';
import {
  connectProfile,
  disconnectProfile,
} from 'services/features/profile-live-order-feed/actions';
import { getProfileLiveOrderFeedData } from 'services/features/profile-live-order-feed/selectors';
import Orders from 'components/orders/orders';
import Preloader from 'components/preloader/preloader';
import { TWebsocketOrders } from 'services/types/live-order-feed';
import { ROUTES, WEBSOCKET } from 'utils/constants';

const UserOrdersPage = () => {
  const dispatch = useAppDispatch();

  const wsOrdersProfile = `${WEBSOCKET.baseUrl}${
    WEBSOCKET.endpoints.ordersPersonal
  }?token=${localStorage.getItem('accessToken')}`;

  useEffect(() => {
    dispatch(connectProfile(wsOrdersProfile));

    return () => dispatch(disconnectProfile()) as unknown as void;
  }, []);

  const ordersData = useAppSelector(getProfileLiveOrderFeedData);
  let ordersDataReverse: TWebsocketOrders | undefined;

  if (ordersData) {
    const { orders, success, total, totalToday } = ordersData;
    const ordersReverse = orders.slice().reverse();

    ordersDataReverse = { orders: ordersReverse, success, total, totalToday };
  }

  return ordersDataReverse ? (
    <Orders
      ordersData={ordersDataReverse}
      dynamicParentRoute={`${ROUTES.user.profile}/${ROUTES.user.orders}`}
      haveStatus
    />
  ) : (
    <Preloader />
  );
};

export default UserOrdersPage;
