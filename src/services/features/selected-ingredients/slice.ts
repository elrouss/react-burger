import { createSlice } from '@reduxjs/toolkit';
import { IIngredientWithKey } from '../ingredients/types';

type TSliceState = {
  bun: null | IIngredientWithKey;
  ingredients: IIngredientWithKey[];
};

export const initialState: TSliceState = { bun: null, ingredients: [] };

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    SET_BUN: (state, action) => {
      const { key, ingredient } = action.payload;
      const data = {
        ...ingredient,
        key,
      };

      state.bun = data;
    },

    ADD_INGREDIENT: (state, action) => {
      const { key, ingredient } = action.payload;
      const data = {
        ...ingredient,
        key,
      };

      state.ingredients.push(data);
    },

    CHANGE_POSITION_INGREDIENT: (
      state,
      { payload: { dragIndex, hoverIndex } }
    ) => {
      const { ingredients } = state;

      [ingredients[dragIndex], ingredients[hoverIndex]] = [
        ingredients[hoverIndex],
        ingredients[dragIndex],
      ];
    },

    REMOVE_INGREDIENT: (state, { payload }) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== payload.key
      );
    },

    RESET: () => initialState,
  },
});

export const {
  SET_BUN,
  ADD_INGREDIENT,
  CHANGE_POSITION_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
