import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ROUTES } from '../../../utils/constants';
import { logoutUser } from '../../../services/features/user/api';
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
];

function Sidebar({ description }) {
  const dispatch = useDispatch();

  const onLogoutUser = () => {
    dispatch(logoutUser(localStorage.getItem('refreshToken')));
  };

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
        <li className={styles.linksItem} key={uuidv4()}>
          <button
            className={`${styles.link} ${styles.button}`}
            type="button"
            onClick={onLogoutUser}
          >
            Выход
          </button>
        </li>
      </ul>
      <p className={styles.description}>{description}</p>
    </nav>
  );
}

Sidebar.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Sidebar;
