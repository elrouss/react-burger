import { configureStore } from '@reduxjs/toolkit';

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

const store = configureStore({
  reducer: {
    user: userSlice,

    [ingredientsApiReducer.reducerPath]: ingredientsApiReducer.reducer,
    currentIngredient: currentIngredientSlice,
    selectedIngredients: selectedIngredientsSlice,
    orderDetails: orderDetailsSlice,
    liveOrderFeed: liveOrderFeedReducer,
    profileOrderFeed: profileLiveOrderFeedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authMiddleware,
      ingredientsApiReducer.middleware,
      liveOrderFeedMiddleware,
      profileLiveOrderFeedMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
