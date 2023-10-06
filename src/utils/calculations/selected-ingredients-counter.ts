import { IIngredientWithId } from 'services/features/ingredients/types';

const countSelectedIngredients = (
  ingredient: IIngredientWithId,
  selectedBun: IIngredientWithId | null,
  selectedIngredients: IIngredientWithId[]
): number => {
  let value = 0;

  if (
    ingredient.type === 'bun' &&
    selectedBun &&
    selectedBun._id === ingredient._id
  ) {
    value = 2;
  }

  if (ingredient.type !== 'bun' && selectedIngredients) {
    value = selectedIngredients.filter(
      (item) => item._id === ingredient._id
    ).length;
  }

  return value;
};

export default countSelectedIngredients;
