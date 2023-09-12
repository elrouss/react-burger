import { RootState } from 'services/app/store';

const getCurrentIngredient = (state: RootState) =>
  state.currentIngredient.ingredient;

export default getCurrentIngredient;
