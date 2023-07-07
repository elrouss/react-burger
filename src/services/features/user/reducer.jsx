import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './api';

const initialState = {
  user: null,
  isAuthenticated: false,

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
        state.isAuthenticated = true;

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
        state.isAuthenticated = true;

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
        state.isAuthenticated = false;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload;
      })

      .addDefaultCase((state) => state);
  },
});

export default userSlice.reducer;
