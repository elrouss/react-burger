import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';

import { liveOrderFeedReducer } from 'services/features/live-order-feed/reducer';
import { profileLiveOrderFeedReducer } from 'services/features/profile-live-order-feed/reducer';
import {
  liveOrderFeedMiddleware,
  profileLiveOrderFeedMiddleware,
} from 'services/middlewares/ws-middleware';

import userSlice from '../features/user/slice';
import authMiddleware from '../middlewares/auth-middleware';

import { ingredientsApiReducer } from '../features/ingredients/reducer';
import currentIngredientSlice from '../features/current-ingredient/slice';
import selectedIngredientsSlice from '../features/selected-ingredients/slice';
import orderDetailsSlice from '../features/order-details/slice';

const rootReducer = combineReducers({
  user: userSlice,

  [ingredientsApiReducer.reducerPath]: ingredientsApiReducer.reducer,
  currentIngredient: currentIngredientSlice,
  selectedIngredients: selectedIngredientsSlice,
  orderDetails: orderDetailsSlice,
  liveOrderFeed: liveOrderFeedReducer,
  profileOrderFeed: profileLiveOrderFeedReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authMiddleware,
        ingredientsApiReducer.middleware,
        liveOrderFeedMiddleware,
        profileLiveOrderFeedMiddleware
      ),
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
