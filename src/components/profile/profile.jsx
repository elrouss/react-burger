import { Outlet } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Sidebar from './sidebar/sidebar';
import styles from './profile.module.scss';

function Profile() {
  return (
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
}

export default Profile;
