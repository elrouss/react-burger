import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import API from '../../../utils/constants';

// Define a service using a base URL and expected endpoints
export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API.baseUrl }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => API.ingredients,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetIngredientsQuery } = ingredientsApi;
