import React from 'react';
import { useAppSelector } from 'services/app/hooks';
import { checkUserAuthStatus } from 'services/features/user/selectors';
import Preloader from 'components/preloader/preloader';

const WithAuthCheck = ({ component }: { component: React.ReactElement }) => {
  const isAuthChecked = useAppSelector(checkUserAuthStatus);

  return isAuthChecked ? component : <Preloader />;
};

export default WithAuthCheck;
