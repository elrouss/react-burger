import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApiReducer } from '../features/ingredients/reducer';
import currentIngredientReducer from '../features/current-ingredient/reducer';
import selectedIngredientsReducer from '../features/selected-ingredients/reducer';
import orderDetailsReducer from '../features/order-details/reducer';

const store = configureStore({
  reducer: {
    [ingredientsApiReducer.reducerPath]: ingredientsApiReducer.reducer,
    currentIngredient: currentIngredientReducer,
    selectedIngredients: selectedIngredientsReducer,
    orderDetails: orderDetailsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApiReducer.middleware),
});

export default store;
