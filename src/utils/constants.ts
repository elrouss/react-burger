export const API = Object.freeze({
  baseUrl: 'https://norma.nomoreparties.space/api',
  endpoints: {
    user: {
      data: '/auth/user',
      register: '/auth/register',
      login: '/auth/login',
      logout: '/auth/logout',
      tokenRefresh: '/auth/token',
      password: {
        forgot: '/password-reset',
        reset: '/password-reset/reset',
      },
    },

    ingredients: '/ingredients',
    orders: '/orders',
  },
});

export const WEBSOCKET = Object.freeze({
  baseUrl: 'wss://norma.nomoreparties.space',
  endpoints: {
    ordersAll: '/orders/all',
    ordersPersonal: '/orders', // do not forget accessToken in headers
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
  user: {
    profile: '/profile',
    orders: 'orders',
    orderDetails: 'orders/:id',
  },
  orders: '/feed',
  orderDetails: '/feed/:id',
  ingredients: '/ingredients',
  ingredientDetails: '/ingredients/:id',
});
