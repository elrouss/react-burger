import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ROUTES } from '../../../utils/constants';
import { logoutUser } from '../../../services/features/user/api';
import { isLoading } from '../../../services/features/user/selectors';
import styles from './sidebar.module.scss';

const links = [
  {
    name: 'Профиль',
    url: ROUTES.user.profile,
  },
  {
    name: 'История заказов',
    url: ROUTES.user.orders,
  },
];

function Sidebar({ description }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutUser = () => {
    dispatch(logoutUser())
      .then(() => navigate(`${ROUTES.sign.in}`))
      .catch((err) => console.error(`Error: ${err}`));
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
            disabled={useSelector(isLoading)}
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
