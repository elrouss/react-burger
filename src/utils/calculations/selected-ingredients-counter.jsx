const countSelectedIngredients = (
  ingredient,
  selectedBun,
  selectedIngredients
) => {
  let value = 0;

  if (ingredient.type === 'bun' && selectedBun) {
    value = (selectedBun._id === ingredient._id) * 2;
  }

  if (ingredient.type !== 'bun' && selectedIngredients) {
    value = selectedIngredients.filter(
      (item) => item._id === ingredient._id
    ).length;
  }

  return value;
};

export default countSelectedIngredients;
