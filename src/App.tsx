import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useNavigationType,
  NavigationType,
} from 'react-router-dom';
import { useAppDispatch } from 'services/app/hooks';

import WithAuthCheck from 'hocs/withAuthCheck';
import { OnlyAuth, OnlyUnAuth } from 'hocs/withProtectedRoute';

import HomePage from 'pages/home/home';
import IngredientDetailsPage from 'pages/ingredient-details/ingredient-details';
import FeedPage from 'pages/feed/feed';
import OrderDetailsPage from 'pages/order-details/order-details';
import ProfilePage from 'pages/profile/profile';
import UserInfoPage from 'pages/profile/user-info/user-info';
import UserOrdersPage from 'pages/profile/user-orders/user-orders';
import RegisterPage from 'pages/register/register';
import LoginPage from 'pages/login/login';
import ForgotPasswordPage from 'pages/forgot-password/forgot-password';
import ResetPasswordPage from 'pages/reset-password/reset-password';
import NotFoundPage from 'pages/not-found/not-found';

import Modal from 'components/modal/modal';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import OrderInfo from 'components/order-info/order-info';

import { ROUTES } from 'utils/constants';
import { checkUserAuth } from 'services/features/user/api';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import { RESET_INGREDIENT_DETAILS } from 'services/features/current-ingredient/slice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const dispatch = useAppDispatch();

  const background:
    | {
        hash: string;
        key: string;
        pathname: string;
        search: string;
        state: null | unknown;
      }
    | undefined = location.state?.background;

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
          path={ROUTES.orderDetails}
          element={<WithAuthCheck component={<OrderDetailsPage />} />}
        />

        <Route
          path={ROUTES.user.profile}
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route index element={<UserInfoPage />} />
          <Route path={ROUTES.user.orders} element={<UserOrdersPage />} />
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

      {background?.pathname === ROUTES.home && (
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

      {background?.pathname.endsWith(ROUTES.orders) &&
        navigationType === NavigationType.Push && (
          <Routes>
            <Route
              path={ROUTES.orderDetails}
              element={
                <WithAuthCheck
                  component={
                    <Modal id="order-info" onModalClose={handleModalClose}>
                      <OrderInfo hasWrapper />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}

      {background?.pathname.endsWith(
        `${ROUTES.user.profile}/${ROUTES.user.orders}`
      ) &&
        navigationType === NavigationType.Push && (
          <Routes>
            <Route
              path={`${ROUTES.user.profile}/${ROUTES.user.orderDetails}`}
              element={
                <WithAuthCheck
                  component={
                    <Modal id="order-info" onModalClose={handleModalClose}>
                      <OrderInfo hasWrapper />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
    </>
  );
};

export default App;
