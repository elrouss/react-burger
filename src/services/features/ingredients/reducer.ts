import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'utils/constants';
import { IIngredient } from './types';

interface IGetIngredientsResponse {
  data: IIngredient[];
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
