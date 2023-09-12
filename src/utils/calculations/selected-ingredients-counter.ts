import { IIngredient } from 'services/features/ingredients/types';

const countSelectedIngredients = (
  ingredient: IIngredient,
  selectedBun: IIngredient | null,
  selectedIngredients: IIngredient[]
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
