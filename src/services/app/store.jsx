import { configureStore } from '@reduxjs/toolkit';

import selectedIngredientsReducer from '../features/selectedIngredients/selectedIngredientsReducer';

export default configureStore({
  reducer: {
    selectedIngredients: selectedIngredientsReducer,
  },
});
