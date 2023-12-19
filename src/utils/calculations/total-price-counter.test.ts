import { mockBun1 } from 'assets/mock/ingredients/bun';
import {
  mockIngredient1,
  mockIngredient2,
  mockIngredient3,
} from 'assets/mock/ingredients/ingredient';
import countTotalPrice from './total-price-counter';

describe('check counting total price function', () => {
  const sumBun = countTotalPrice('bun', mockBun1);
  const sumIngredients = countTotalPrice('ingredients', [
    mockIngredient1,
    mockIngredient2,
    mockIngredient3,
  ]);

  it('should check counting only a bun', () => {
    expect(sumBun).toBe(mockBun1.price * 2); // two buns
  });

  it('should check counting only ingredients', () => {
    expect(sumIngredients).toBe(
      mockIngredient1.price + mockIngredient2.price + mockIngredient3.price
    );
  });

  it('should check counting a bun and ingredients', () => {
    expect(sumBun + sumIngredients).toBe(
      mockBun1.price * 2 +
        mockIngredient1.price +
        mockIngredient2.price +
        mockIngredient3.price
    );
  });
});
