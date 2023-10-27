import { mockBun1, mockBun2 } from 'assets/mock/ingredients/bun';
import {
  mockIngredient1,
  mockIngredient2,
  mockIngredient3,
} from 'assets/mock/ingredients/ingredient';
import { mockKey } from 'assets/mock/ingredients/key';
import reducer, {
  initialState,
  SET_BUN,
  ADD_INGREDIENT,
  CHANGE_POSITION_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET,
} from './slice';

describe('check the burger constructor', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, RESET())).toEqual(initialState);
  });

  it('should set a bun', () => {
    const data = { ingredient: mockBun1, key: `${mockKey}1` };

    expect(reducer(initialState, SET_BUN(data))).toEqual({
      ...initialState,
      bun: mockBun1,
    });
  });

  it('should change the bun', () => {
    const state = { bun: mockBun1, ingredients: [] };
    const data = { ingredient: mockBun2, key: `${mockKey}2` };

    expect(reducer(state, SET_BUN(data))).toEqual({
      ...initialState,
      bun: mockBun2,
    });
  });

  it('should add an ingredient', () => {
    const data = { ingredient: mockIngredient1, key: `${mockKey}1` };

    expect(reducer(initialState, ADD_INGREDIENT(data))).toEqual({
      ...initialState,
      ingredients: [mockIngredient1],
    });
  });

  it('should change positions of two ingredients', () => {
    const state = {
      bun: mockBun1,
      ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
    };

    expect(
      reducer(
        state,
        CHANGE_POSITION_INGREDIENT({ dragIndex: 0, hoverIndex: 2 })
      )
    ).toEqual({
      ...state,
      ingredients: [mockIngredient3, mockIngredient2, mockIngredient1],
    });
  });

  it('should remove an ingredient', () => {
    const state = {
      bun: mockBun1,
      ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
    };

    expect(reducer(state, REMOVE_INGREDIENT(mockIngredient2))).toEqual({
      ...state,
      ingredients: [mockIngredient1, mockIngredient3],
    });
  });

  it('should clear the constructor', () => {
    const state = {
      bun: mockBun1,
      ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
    };

    expect(reducer(state, RESET())).toEqual(initialState);
  });
});
