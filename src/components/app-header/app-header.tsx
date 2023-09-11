import { memo, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTES } from 'utils/constants';
import styles from './app-header.module.scss';

interface ILinks {
  name: string;
  url: string;
  icon: ReactNode;
}

const links: ILinks[] = [
  {
    name: 'Конструктор',
    url: ROUTES.home,
    icon: <BurgerIcon type="primary" />,
  },
  {
    name: 'Лента заказов',
    url: ROUTES.orders,
    icon: <ListIcon type="primary" />,
  },
];

const AppHeader = () => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <div className={styles.twoColumns}>
        <nav>
          <ul className={styles.navLinks}>
            {links.map(({ name, url, icon }) => (
              <li key={uuidv4()}>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.navLink, {
                      [styles.navLinkActive]: isActive,
                    })
                  }
                  to={url}
                >
                  {icon}
                  <span>{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <NavLink to={ROUTES.home}>
          <Logo />
        </NavLink>
      </div>
      <NavLink
        className={({ isActive }) =>
          classNames(styles.navLink, {
            [styles.navLinkActive]: isActive,
          })
        }
        to={ROUTES.user.profile}
      >
        <ProfileIcon type="primary" />
        <span>Личный кабинет</span>
      </NavLink>
    </div>
  </header>
);

export default memo(AppHeader);
