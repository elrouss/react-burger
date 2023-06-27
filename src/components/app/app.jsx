import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/home';
import RegisterPage from '../../pages/register';
import LoginPage from '../../pages/login';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';

import { ROUTES } from '../../utils/constants';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.sign.up} element={<RegisterPage />} />
      <Route path={ROUTES.sign.in} element={<LoginPage />} />
      <Route path={ROUTES.password.forgot} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.password.reset} element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
