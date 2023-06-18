import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from '../features/ingredients/ingredientsApi';
import selectedIngredientsReducer from '../features/selectedIngredients/selectedIngredientsReducer';

export default configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    selectedIngredients: selectedIngredientsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});
