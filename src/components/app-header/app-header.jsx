import { memo } from 'react';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.scss';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.twoColumns}>
          <nav>
            <ul className={styles.navLinks}>
              <li>
                <a className={styles.navLink} href="/test">
                  <BurgerIcon type="primary" />
                  <span>Конструктор</span>
                </a>
              </li>
              <li>
                <a className={styles.navLink} href="/test">
                  <ListIcon type="primary" />
                  <span>Лента заказов</span>
                </a>
              </li>
            </ul>
          </nav>
          <Logo />
        </div>
        <a className={styles.account} href="/test">
          <ProfileIcon type="primary" />
          <span>Личный кабинет</span>
        </a>
      </div>
    </header>
  );
}

export default memo(AppHeader);
