import Orders from 'components/orders/orders';
import { ROUTES } from 'utils/constants';

const UserOrdersPage = () => (
  <Orders
    dynamicParentRoute={`${ROUTES.user.profile}/${ROUTES.user.orders}`}
    haveStatus
  />
);

export default UserOrdersPage;
