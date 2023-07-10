export const isLoading = (state) => state.user.process.isLoading;

export const checkUserAuthStatus = (state) => state.user.isAuthChecked;

export const checkUserData = (state) => state.user.user;
export const getUserLogin = (state) => state.user.user?.email;
export const getUserName = (state) => state.user.user?.name;
