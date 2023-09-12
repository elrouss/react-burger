import { RootState } from 'services/app/store';

export const isLoading = (state: RootState) => state.user.process.isLoading;

export const checkUserAuthStatus = (state: RootState) =>
  state.user.isAuthChecked;

export const checkUserData = (state: RootState) => state.user.user;
export const getUserLogin = (state: RootState) => state.user.user?.email;
export const getUserName = (state: RootState) => state.user.user?.name;
