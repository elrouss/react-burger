import { createAction, createReducer } from '@reduxjs/toolkit';

export const ADD_INGREDIENT = createAction(
  'selectedIngredients/add_ingredient'
);
export const REMOVE_INGREDIENT = createAction(
  'selectedIngredients/remove_ingredient'
);
export const RESET = createAction('selectedIngredients/reset');

const initialState = { bun: null, ingredients: [] };

const selectedIngredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_INGREDIENT, (state, { payload }) => {
      const { _id, name, type, image, price } = payload.ingredient;
      const { key } = payload;

      const ingredientNew = {
        _id,
        key,
        name,
        type,
        image,
        price,
      };

      if (type === 'bun') {
        state.bun = ingredientNew;
      } else {
        state.ingredients.push(ingredientNew);
      }
    })

    .addCase(REMOVE_INGREDIENT, (state, { payload }) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== payload.key
      );
    })

    .addCase(RESET, () => initialState)

    .addDefaultCase((state) => state);
});

export default selectedIngredientsReducer;
