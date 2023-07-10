const authMiddleware = () => (next) => (action) => {
  if (
    ['user/register/fulfilled', 'user/login/fulfilled'].includes(action.type)
  ) {
    localStorage.setItem(
      'accessToken',
      action.payload.accessToken.split(' ')[1]
    );
    localStorage.setItem('refreshToken', action.payload.refreshToken);
  }

  if (action.type === 'user/logout/fulfilled') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return next(action);
};

export default authMiddleware;
