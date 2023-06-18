import { createAction, createReducer } from '@reduxjs/toolkit';

const UPLOAD = createAction('ingredients/upload');

const initialState = { ingredients: [] };

const ingredientsReducer = createReducer(initialState, (builder) => {
  builder.addCase(UPLOAD, (state, action) => {
    state.ingredients = action.ingredients;
  });
});

export default ingredientsReducer;
