import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApiReducer } from '../features/ingredients/ingredientsApiReducer';
import currentIngredientReducer from '../features/currentIngredient/currentIngredientReducer';
import selectedIngredientsReducer from '../features/selectedIngredients/selectedIngredientsReducer';
import orderDetailsReducer from '../features/orderDetails/orderDetailsReducer';

export default configureStore({
  reducer: {
    [ingredientsApiReducer.reducerPath]: ingredientsApiReducer.reducer,
    currentIngredient: currentIngredientReducer,
    selectedIngredients: selectedIngredientsReducer,
    orderDetails: orderDetailsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApiReducer.middleware),
});
