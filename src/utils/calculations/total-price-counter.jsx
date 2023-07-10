const countTotalPrice = (type, ingredients) => {
  let sum = 0;

  if (ingredients) {
    if (type === 'bun') {
      sum += ingredients.price * 2;
    }

    if (type === 'ingredients') {
      sum += ingredients.reduce((acc, curr) => acc + curr.price, 0);
    }
  }

  return sum;
};

export default countTotalPrice;
