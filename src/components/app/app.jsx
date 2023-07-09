import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import WithAuthCheck from '../../hocs/withAuthCheck';
import { OnlyAuth, OnlyUnAuth } from '../../hocs/withProtectedRoute';

import HomePage from '../../pages/home';
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details';
import FeedPage from '../../pages/feed';
import ProfilePage from '../../pages/profile';
import ProfileOrdersPage from '../../pages/profile-orders';
import RegisterPage from '../../pages/register';
import LoginPage from '../../pages/login';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import NotFoundPage from '../../pages/not-found';

import UserInfo from '../profile/user-info/user-info';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { ROUTES } from '../../utils/constants';
import { checkUserAuth } from '../../services/features/user/api';
import { useGetIngredientsQuery } from '../../services/features/ingredients/reducer';
import { RESET_INGREDIENT_DETAILS } from '../../services/features/current-ingredient/reducer';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state?.background;

  const handleModalClose = () => {
    const MILLISECONDS = 100; // clear data in modal after it is closed

    navigate(-1);
    setTimeout(() => dispatch(RESET_INGREDIENT_DETAILS()), MILLISECONDS);
  };

  useGetIngredientsQuery();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route
          path={ROUTES.ingredientDetails}
          element={<WithAuthCheck component={<IngredientDetailsPage />} />}
        />
        <Route
          path={ROUTES.orders}
          element={<WithAuthCheck component={<FeedPage />} />}
        />
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
        <Route
          path="*"
          element={<WithAuthCheck component={<NotFoundPage />} />}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={ROUTES.ingredientDetails}
            element={
              <WithAuthCheck
                component={
                  <Modal
                    id="ingredient-details"
                    onModalClose={handleModalClose}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
