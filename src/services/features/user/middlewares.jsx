const authMiddleware = () => (next) => (action) => {
  if (
    action.type.startsWith('user/registerUser') ||
    action.type.startsWith('user/loginUser')
  ) {
    localStorage.setItem('refreshToken', action.payload?.refreshToken);
  }

  return next(action);
};

export default authMiddleware;
