import { mockBun1 } from 'assets/mock/ingredients/bun';
import {
  mockIngredient1,
  mockIngredient2,
} from 'assets/mock/ingredients/ingredient';
import countSelectedIngredients from './selected-ingredients-counter';

describe('check counting selected ingredients function', () => {
  it('should count buns', () => {
    expect(countSelectedIngredients(mockBun1, mockBun1, [])).toBe(2);
  });

  it('should count ingredients', () => {
    expect(
      countSelectedIngredients(mockIngredient1, null, [
        mockIngredient1,
        mockIngredient1,
        mockIngredient2,
      ])
    ).toBe(2);
  });
});
