import { createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../ingredients/types';

const initialState: { ingredient: null | IIngredient } = {
  ingredient: null,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    SHOW_INGREDIENT_DETAILS: (state, { payload }: { payload: IIngredient }) => {
      state.ingredient = payload
    },

    RESET_INGREDIENT_DETAILS: () => initialState,
  },
});

export const { SHOW_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
