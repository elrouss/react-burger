import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'utils/constants';
import { IIngredientWithId } from './types';

interface IGetIngredientsResponse {
  data: IIngredientWithId[];
}

export const ingredientsApiReducer = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API.baseUrl }),
  endpoints: (builder) => ({
    getIngredients: builder.query<IGetIngredientsResponse, void>({
      query: () => API.endpoints.ingredients,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApiReducer;
