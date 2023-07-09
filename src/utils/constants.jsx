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
  },
  orders: '/feed',
  ingredientDetails: '/ingredients/:id',
});

// USER DATA (TEST)
// email: angelina-jolie@google.com
// password: angelina-jolie@google.com
