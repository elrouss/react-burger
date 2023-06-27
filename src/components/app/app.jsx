import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/home';
import RegisterPage from '../../pages/register';

import { ROUTES } from '../../utils/constants';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.sign.up} element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
