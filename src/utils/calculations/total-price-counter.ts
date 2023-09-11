import { IIngredientWithKey } from 'services/features/ingredients/types';

const countTotalPrice = (
  type: 'bun' | 'ingredients',
  ingredient: IIngredientWithKey | IIngredientWithKey[] | null
): number => {
  let sum = 0;

  if (type === 'bun' && ingredient) {
    sum += (ingredient as IIngredientWithKey).price * 2;
  }

  if (
    type === 'ingredients' &&
    Array.isArray(ingredient) &&
    ingredient.length
  ) {
    sum += ingredient.reduce((acc, curr) => acc + curr.price, 0);
  }

  return sum;
};

export default countTotalPrice;
