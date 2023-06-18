import { createAction, createReducer } from '@reduxjs/toolkit';

const upload = createAction('ingredients/upload');

const initialState = { ingredients: [] };

const ingredientsReducer = createReducer(initialState, (builder) => {
  builder.addCase(upload, (state, action) => {
    state.ingredients = action.ingredients;
  });
});

export default ingredientsReducer;
