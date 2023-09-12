import { Outlet } from 'react-router-dom';
import AppHeader from 'components/app-header/app-header';
import Sidebar from 'components/sidebar/sidebar';
import styles from './profile.module.scss';

const ProfilePage = () => (
  <>
    <AppHeader />
    <main>
      <div className={styles.wrapper}>
        <Sidebar description="В этом разделе вы можете изменить свои персональные данные" />
        <Outlet />
      </div>
    </main>
  </>
);

export default ProfilePage;
