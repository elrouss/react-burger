import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../utils/constants';

export const sendOrder = createAsyncThunk(
  'orderDetails/sendOrder',
  async (order) => {
    const res = await fetch(`${API.baseUrl}${API.endpoints.orders}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: order }),
    });

    if (!res.ok) {
      return Promise.reject(new Error(`Error ${res.status}`));
    }

    const success = await res.json();

    return success;
  }
);

const initialState = {
  order: null,
  status: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    SAVE_ORDER_DETAILS(state, { payload }) {
      state.order = payload;
    },

    RESET_ORDER_DETAILS: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, { payload }) => {
        state.status = false;
        state.order = payload;
      })
      .addCase(sendOrder.rejected, (state, { payload }) => {
        state.status = false;
        state.error = payload;
      })

      .addDefaultCase((state) => state);
  },
});

export const { SAVE_ORDER_DETAILS, RESET_ORDER_DETAILS } =
  orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
