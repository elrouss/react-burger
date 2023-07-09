import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  checkUserAuth,
  editUserData,
} from './api';

const initialState = {
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
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthChecked = true;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthChecked = true;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.process.isLoading = true;
        state.process.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload;
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
        state.process.error = payload;
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
        state.process.error = payload;
      })

      .addDefaultCase((state) => state);
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
