import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  checkUserAuthStatus,
  checkUserData,
} from '../services/features/user/selectors';
import Preloader from '../components/preloader/preloader';
import { ROUTES } from '../utils/constants';

function WithProtectedRoute({ component, onlyUnAuth = false }) {
  const isAuthChecked = useSelector(checkUserAuthStatus);
  const user = useSelector(checkUserData);
  const location = useLocation();

  const { from } = location.state || { from: { pathname: ROUTES.home } };
  const isRouteResetPassword = location.pathname.endsWith(
    ROUTES.password.reset
  );
  const hasForgottenPassword = JSON.parse(
    localStorage.getItem('forgotPassword')
  );

  if (!isAuthChecked) return <Preloader />;

  if (onlyUnAuth && user) {
    return <Navigate to={from} />;
  }

  if (onlyUnAuth && !user && isRouteResetPassword && !hasForgottenPassword) {
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
  component: PropTypes.node.isRequired,
  onlyUnAuth: PropTypes.bool,
};

WithProtectedRoute.defaultProps = {
  onlyUnAuth: false,
};

OnlyUnAuth.propTypes = {
  component: PropTypes.node.isRequired,
};
