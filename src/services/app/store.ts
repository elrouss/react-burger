import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../features/user/slice';

import { ingredientsApiReducer } from '../features/ingredients/reducer';
import currentIngredientSlice from '../features/current-ingredient/slice';
import selectedIngredientsSlice from '../features/selected-ingredients/slice';
import orderDetailsSlice from '../features/order-details/slice';

import authMiddleware from '../features/user/middlewares';

const store = configureStore({
  reducer: {
    user: userSlice,

    [ingredientsApiReducer.reducerPath]: ingredientsApiReducer.reducer,
    currentIngredient: currentIngredientSlice,
    selectedIngredients: selectedIngredientsSlice,
    orderDetails: orderDetailsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authMiddleware,
      ingredientsApiReducer.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
