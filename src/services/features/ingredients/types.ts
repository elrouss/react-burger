import { RefObject } from 'react';

export interface IIngredient {
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IIngredientWithId extends IIngredient {
  _id: string;
}

export interface IIngredientWithKey extends IIngredientWithId {
  key: string;
}

export interface IIngredientsTable {
  typeRus: string;
  typeEng: string;
  ref: RefObject<HTMLDivElement>;
}
