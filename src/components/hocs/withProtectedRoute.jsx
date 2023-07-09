import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  checkUserAuthStatus,
  checkUserData,
} from '../../services/features/user/selectors';
import Preloader from '../preloader/preloader';
import { ROUTES } from '../../utils/constants';

function WithProtectedRoute({ component, onlyUnAuth = false }) {
  const isAuthChecked = useSelector(checkUserAuthStatus);
  const user = useSelector(checkUserData);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: ROUTES.home } };

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.sign.in} state={{ from: location }} />;
  }

  return component;
}

export function OnlyUnAuth({ component }) {
  return <WithProtectedRoute onlyUnAuth component={component} />;
}
export const OnlyAuth = WithProtectedRoute;

WithProtectedRoute.propTypes = {
  onlyUnAuth: PropTypes.bool.isRequired,
  component: PropTypes.node.isRequired,
};

OnlyUnAuth.propTypes = {
  component: PropTypes.node.isRequired,
};
