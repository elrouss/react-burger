import { mockIngredient1 } from 'assets/mock/ingredients/ingredient';
import reducer, {
  initialState,
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from './slice';

describe("check ingredient's data in modal window", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, RESET_INGREDIENT_DETAILS())).toEqual(
      initialState
    );
  });

  it('should set an ingredient', () => {
    expect(
      reducer(initialState, SHOW_INGREDIENT_DETAILS(mockIngredient1))
    ).toEqual({ ingredient: mockIngredient1 });
  });

  it('should clear data', () => {
    const state = { ingredient: mockIngredient1 };

    expect(reducer(state, RESET_INGREDIENT_DETAILS())).toEqual(initialState);
  });
});
