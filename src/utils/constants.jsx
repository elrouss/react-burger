export const API = Object.freeze({
  baseUrl: 'https://norma.nomoreparties.space/api',
  endpoints: {
    ingredients: '/ingredients',
    orders: '/orders',
  },
});

export const ROUTES = Object.freeze({
  home: '/',
  sign: {
    up: '/register',
    in: '/login',
  },
  password: {
    forgot: '/forgot-password',
    reset: '/reset-password',
  },
  profile: '/profile',
  ingredientDetails: '/ingredients/:id',
});
