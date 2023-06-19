import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import API from '../../../utils/constants';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API.baseUrl }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => API.ingredients,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
