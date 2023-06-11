export const initialSelectedIngredients = {
  selectedBun: null,
  selectedIngredients: [],
};

export function reducerSelectedIngredients(
  state,
  { action, _id, name, type, image, price }
) {
  const ingredientNew = {
    _id,
    name,
    type,
    image,
    price,
  };

  switch (action) {
    case 'add':
      if (type === 'bun') return { ...state, selectedBun: ingredientNew };

      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, ingredientNew],
      };

    case 'reset':
      return initialSelectedIngredients;

    default:
      throw new Error(`Wrong type of action: ${action}`);
  }
}
