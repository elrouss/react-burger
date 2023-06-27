import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/home';

import { ROUTES } from '../../utils/constants';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
    </Routes>
  );
}

export default App;
