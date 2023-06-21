import { createAction, createReducer } from '@reduxjs/toolkit';

export const ADD_INGREDIENT = createAction(
  'selectedIngredients/add_ingredient'
);
export const CHANGE_POSITION_INGREDIENT = createAction(
  'selectedIngredients/change_position_ingredient'
);
export const REMOVE_INGREDIENT = createAction(
  'selectedIngredients/remove_ingredient'
);
export const RESET = createAction('selectedIngredients/reset');

const initialState = { bun: null, ingredients: [] };

const selectedIngredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_INGREDIENT, (state, { payload }) => {
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
    })

    .addCase(
      CHANGE_POSITION_INGREDIENT,
      (state, { payload: { dragIndex, hoverIndex } }) => {
        const { ingredients } = state;

        [ingredients[dragIndex], ingredients[hoverIndex]] = [
          ingredients[hoverIndex],
          ingredients[dragIndex],
        ];
      }
    )

    .addCase(REMOVE_INGREDIENT, (state, { payload }) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== payload.key
      );
    })

    .addCase(RESET, () => initialState)

    .addDefaultCase((state) => state);
});

export default selectedIngredientsReducer;
