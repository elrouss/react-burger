import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import HomePage from '../../pages/home';
import ProfilePage from '../../pages/profile';
import RegisterPage from '../../pages/register';
import LoginPage from '../../pages/login';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';

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
      <Route path={ROUTES.profile} element={<ProfilePage />} />
      <Route path={ROUTES.sign.up} element={<RegisterPage />} />
      <Route path={ROUTES.sign.in} element={<LoginPage />} />
      <Route path={ROUTES.password.forgot} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.password.reset} element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
