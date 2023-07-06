import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../utils/constants";

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
