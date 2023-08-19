import { createSlice } from '@reduxjs/toolkit';
import { IUser, IUserErrorResponse } from './types';
import {
  registerUser,
  loginUser,
  logoutUser,
  checkUserAuth,
  editUserData,
} from './api';

type TSliceState = {
  user: IUser | null;
  isAuthChecked: boolean;

  process: {
    isLoading: boolean;
    error: null | IUserErrorResponse;
  };
};

const initialState: TSliceState = {
  user: null,
  isAuthChecked: false,

  process: {
    isLoading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload as IUserErrorResponse;
      })

      .addCase(loginUser.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload as IUserErrorResponse;
      })

      .addCase(logoutUser.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload as IUserErrorResponse;
      })

      .addCase(checkUserAuth.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.user = payload.user;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(checkUserAuth.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.isAuthChecked = true;
        state.process.error = payload as IUserErrorResponse;
      })

      .addCase(editUserData.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(editUserData.fulfilled, (state, { payload }) => {
        state.user = payload.user;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(editUserData.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload as IUserErrorResponse;
      })

      .addDefaultCase((state) => state);
  },
});

export default userSlice.reducer;
