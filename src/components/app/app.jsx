import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { OnlyAuth, OnlyUnAuth } from '../../hocs/withProtectedRoute';

import HomePage from '../../pages/home';
import FeedPage from '../../pages/feed';
import ProfilePage from '../../pages/profile';
import ProfileOrdersPage from '../../pages/profile-orders';
import RegisterPage from '../../pages/register';
import LoginPage from '../../pages/login';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import NotFoundPage from '../../pages/not-found';

import UserInfo from '../profile/user-info/user-info';

import { ROUTES } from '../../utils/constants';
import { checkUserAuth } from '../../services/features/user/api';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.orders} element={<FeedPage />} />
      <Route
        path={ROUTES.user.profile}
        element={<OnlyAuth component={<ProfilePage />} />}
      >
        <Route index element={<UserInfo />} />
        <Route path={ROUTES.user.orders} element={<ProfileOrdersPage />} />
      </Route>
      <Route
        path={ROUTES.sign.up}
        element={<OnlyUnAuth component={<RegisterPage />} />}
      />
      <Route
        path={ROUTES.sign.in}
        element={<OnlyUnAuth component={<LoginPage />} />}
      />
      <Route
        path={ROUTES.password.forgot}
        element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
      />
      <Route
        path={ROUTES.password.reset}
        element={<OnlyUnAuth component={<ResetPasswordPage />} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
