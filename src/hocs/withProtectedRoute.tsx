import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'services/app/hooks';
import {
  checkUserAuthStatus,
  checkUserData,
} from 'services/features/user/selectors';
import Preloader from 'components/preloader/preloader';
import { ROUTES } from 'utils/constants';

interface IWithProtectedRouteProps {
  component: React.ReactElement;
  onlyUnAuth?: boolean;
}

const WithProtectedRoute: React.FC<IWithProtectedRouteProps> = ({
  component,
  onlyUnAuth = false,
}) => {
  const isAuthChecked = useAppSelector(checkUserAuthStatus);
  const user = useAppSelector(checkUserData);
  const location = useLocation();

  const { from } = location.state || { from: { pathname: ROUTES.home } };

  if (!isAuthChecked) return <Preloader />;

  if (onlyUnAuth && user) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.sign.in} state={{ from: location }} />;
  }

  return component;
};

export const OnlyUnAuth = ({
  component,
}: {
  component: React.ReactElement;
}) => <WithProtectedRoute onlyUnAuth component={component} />;

export const OnlyAuth = WithProtectedRoute;
