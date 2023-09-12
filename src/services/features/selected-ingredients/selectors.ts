import { RootState } from 'services/app/store';

export const getSelectedBun = (state: RootState) =>
  state.selectedIngredients.bun;
export const getSelectedIngredients = (state: RootState) =>
  state.selectedIngredients.ingredients;
