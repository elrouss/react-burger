import { memo } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTES } from '../../utils/constants';
import styles from './app-header.module.scss';

const links = [
  {
    name: 'Конструктор',
    url: ROUTES.home,
    icon: <BurgerIcon type="primary" />,
  },
  {
    name: 'Лента заказов',
    url: '/no-more-tests',
    icon: <ListIcon type="primary" />,
  },
];

function AppHeader() {
  // TODO: with outlet? renders and on main is always new api

  const renderNavLinkStyle = (isActive) =>
    `${styles.navLink}${(isActive && ` ${styles.navLinkActive}`) || ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.twoColumns}>
          <nav>
            <ul className={styles.navLinks}>
              {links.map(({ name, url, icon }) => (
                <li key={uuidv4()}>
                  <NavLink
                    className={({ isActive }) => renderNavLinkStyle(isActive)}
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
          className={({ isActive }) => renderNavLinkStyle(isActive)}
          to={ROUTES.profile}
        >
          <ProfileIcon type="primary" />
          <span>Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  );
}

export default memo(AppHeader);
