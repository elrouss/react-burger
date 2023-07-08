import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import HomePage from '../../pages/home';
import ProfilePage from '../../pages/profile';
import ProfileOrdersPage from '../../pages/profile-orders';
import RegisterPage from '../../pages/register';
import LoginPage from '../../pages/login';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import NotFoundPage from '../../pages/not-found';

import UserInfo from '../profile/user-info/user-info';

import { ROUTES } from '../../utils/constants';
import { getUserData } from '../../services/features/user/api';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.user.profile} element={<ProfilePage />}>
        <Route index element={<UserInfo />} />
        <Route path={ROUTES.user.orders} element={<ProfileOrdersPage />} />
      </Route>
      <Route path={ROUTES.sign.up} element={<RegisterPage />} />
      <Route path={ROUTES.sign.in} element={<LoginPage />} />
      <Route path={ROUTES.password.forgot} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.password.reset} element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
