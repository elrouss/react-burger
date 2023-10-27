import { createSlice } from '@reduxjs/toolkit';
import { IIngredientWithId } from '../ingredients/types';

export const initialState: { ingredient: null | IIngredientWithId } = {
  ingredient: null,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    SHOW_INGREDIENT_DETAILS: (
      state,
      { payload }: { payload: IIngredientWithId }
    ) => {
      state.ingredient = payload;
    },

    RESET_INGREDIENT_DETAILS: () => initialState,
  },
});

export const { SHOW_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
