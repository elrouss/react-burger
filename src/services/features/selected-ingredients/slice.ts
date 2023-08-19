import { createSlice } from '@reduxjs/toolkit';
import { IIngredientWithKey } from '../ingredients/types';

type TSliceState = {
  bun: null | IIngredientWithKey;
  ingredients: IIngredientWithKey[];
};

const initialState: TSliceState = { bun: null, ingredients: [] };

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    ADD_INGREDIENT: (state, { payload }) => {
      const { key, ingredient } = payload;
      const data = {
        ...ingredient,
        key,
      };

      if (ingredient.type === 'bun') {
        state.bun = data;
      } else {
        state.ingredients.push(data);
      }
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
  ADD_INGREDIENT,
  CHANGE_POSITION_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
