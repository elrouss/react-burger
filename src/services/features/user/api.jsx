import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../utils/constants';

export const registerUser = createAsyncThunk(
  'user/register',
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

export const loginUser = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API.baseUrl}${API.endpoints.user.login}`, {
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
      return rejectWithValue(`User login error: ${err}`);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API.baseUrl}${API.endpoints.user.logout}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        return Promise.reject(new Error(`Error ${res.status}`));
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(`User logout error: ${err}`);
    }
  }
);
