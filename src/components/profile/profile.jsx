import AppHeader from '../app-header/app-header';
import Sidebar from './sidebar/sidebar';
import UserInfo from './user-info/user-info';
import styles from './profile.module.scss';

function Profile() {
  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.wrapper}>
          <Sidebar description="В этом разделе вы можете изменить свои персональные данные" />
          <UserInfo />
        </div>
      </main>
    </>
  );
}

export default Profile;
