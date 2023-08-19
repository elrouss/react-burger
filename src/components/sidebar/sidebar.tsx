import { FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/app/hooks';
import { v4 as uuidv4 } from 'uuid';
import { ROUTES } from '../../utils/constants';
import { logoutUser } from '../../services/features/user/api';
import { isLoading } from '../../services/features/user/selectors';
import styles from './sidebar.module.scss';

interface ISidebarProps {
  description: string;
}

interface ILinks {
  name: string;
  url: string;
}

const links: ILinks[] = [
  {
    name: 'Профиль',
    url: ROUTES.user.profile,
  },
  {
    name: 'История заказов',
    url: ROUTES.user.orders,
  },
];

const Sidebar: FC<ISidebarProps> = ({ description }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
            <Link
              className={`${styles.link}${
                (location.pathname.endsWith(url) && ` ${styles.linkActive}`) ||
                ''
              }`}
              key={uuidv4()}
              to={url}
            >
              {name}
            </Link>
          </li>
        ))}
        <li className={styles.linksItem} key={uuidv4()}>
          <button
            className={`${styles.link} ${styles.button}`}
            type="button"
            disabled={useAppSelector(isLoading)}
            onClick={onLogoutUser}
          >
            Выход
          </button>
        </li>
      </ul>
      <p className={styles.description}>{description}</p>
    </nav>
  );
};

export default Sidebar;
