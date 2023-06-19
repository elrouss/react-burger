import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from '../features/ingredients/ingredientsApi';
import currentIngredientReducer from '../features/currentIngredient/currentIngredientReducer';
import selectedIngredientsReducer from '../features/selectedIngredients/selectedIngredientsReducer';

export default configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    currentIngredient: currentIngredientReducer,
    selectedIngredients: selectedIngredientsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});
