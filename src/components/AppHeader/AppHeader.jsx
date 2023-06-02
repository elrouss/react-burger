import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.scss';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.twoColumns}>
          <nav>
            <ul className={styles.navLinks}>
              <li>
                <a className={styles.navLink} href="/test">
                  <BurgerIcon />
                  <span>Конструктор</span>
                </a>
              </li>
              <li>
                <a className={styles.navLink} href="/test">
                  <ListIcon />
                  <span>Лента заказов</span>
                </a>
              </li>
            </ul>
          </nav>
          <Logo />
        </div>
        <a className={styles.account} href="/test">
          <ProfileIcon />
          <span>Личный кабинет</span>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
