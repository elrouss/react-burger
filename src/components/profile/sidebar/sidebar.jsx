import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ROUTES } from '../../../utils/constants';
import styles from './sidebar.module.scss';

const links = [
  {
    name: 'Профиль',
    url: ROUTES.profile,
  },
  {
    name: 'История заказов',
    url: '/',
  },
  {
    name: 'Выход',
    url: '/',
  },
];

function Sidebar({ description }) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        {links.map(({ name, url }) => (
          <li className={styles.linksItem} key={uuidv4()}>
            <NavLink
              className={({ isActive }) =>
                `${styles.link}${(isActive && ` ${styles.linkActive}`) || ''}`
              }
              key={uuidv4()}
              to={url}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
      <p className={styles.description}>{description}</p>
    </nav>
  );
}

Sidebar.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Sidebar;
