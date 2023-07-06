import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../utils/constants';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API.baseUrl}${API.endpoints.user.register}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        return Promise.reject(new Error(`Error ${res.status}`));
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(`User registration error: ${err}`);
    }
  }
);

const initialState = {
  user: null,
  accessToken: '',
  refreshToken: '',

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
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;

        state.process.isLoading = false;
        state.process.error = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.process.isLoading = false;
        state.process.error = payload;
      })

      .addDefaultCase((state) => state);
  },
});

export default userSlice.reducer;
