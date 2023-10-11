import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from 'components/app-header/app-header';
import Sidebar from 'components/sidebar/sidebar';
import { ROUTES } from 'utils/constants';
import styles from './profile.module.scss';

const ProfilePage = () => {
  const { pathname } = useLocation();
  const isRouteProfile = pathname.endsWith(ROUTES.user.profile);
  const isRouteOrders = pathname.endsWith(ROUTES.user.orders);

  let description = '';

  if (isRouteProfile) {
    description = 'В этом разделе вы можете изменить свои персональные данные';
  }

  if (isRouteOrders) {
    description = 'В этом разделе вы можете просмотреть свою историю заказов';
  }

  return (
    <>
      <AppHeader />
      <main>
        <div
          className={classNames(styles.wrapper, {
            [styles.wrapperOrders]: isRouteOrders,
          })}
        >
          <Sidebar description={description} />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
