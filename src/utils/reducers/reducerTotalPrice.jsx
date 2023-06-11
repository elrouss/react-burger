export const initialTotalPrice = { state: 0 };

export function reducerTotalPrice({ state }, { type, ingredientType, price }) {
  switch (type) {
    case 'increment':
      return ingredientType === 'bun'
        ? { state: state + price * 2 }
        : { state: state + price };

    case 'decrement':
      return ingredientType === 'bun'
        ? { state: state - price * 2 }
        : { state: state - price };

    case 'reset':
      return initialTotalPrice;

    default:
      throw new Error(`Wrong type of action: ${type}`);
  }
}
