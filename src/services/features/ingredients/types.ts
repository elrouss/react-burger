import { RefObject } from 'react';

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
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

export interface IIngredientWithKey extends IIngredient {
  key: string;
}

export interface IIngredientsTable {
  typeRus: string;
  typeEng: string;
  ref: RefObject<HTMLDivElement>;
}
