const authMiddleware = () => (next) => (action) => {
  if (
    action.type.startsWith('user/register') ||
    action.type.startsWith('user/login')
  ) {
    localStorage.setItem('refreshToken', action.payload?.refreshToken);
  }

  if (action.type === 'user/logout/fulfilled') {
    localStorage.removeItem('refreshToken');
  }

  return next(action);
};

export default authMiddleware;
