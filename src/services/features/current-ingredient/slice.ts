import { createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../ingredients/types';

const initialState = {
  ingredient: {
    _id: '',
    name: '',
    image: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
  },
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    SHOW_INGREDIENT_DETAILS: (state, { payload }: { payload: IIngredient }) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, name, image, calories, proteins, fat, carbohydrates } =
        payload;

      state.ingredient = {
        _id,
        name,
        image,
        calories,
        proteins,
        fat,
        carbohydrates,
      };
    },

    RESET_INGREDIENT_DETAILS: () => initialState,
  },
});

export const { SHOW_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
