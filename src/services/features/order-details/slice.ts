import { createSlice } from '@reduxjs/toolkit';
import sendOrder from './api';
import { IOrderResponseSuccess, IOrderResponseFail } from './types';

type TSliceState = {
  order: null | IOrderResponseSuccess;
  status: boolean;
  error: null | IOrderResponseFail;
};

export const initialState: TSliceState = {
  order: null,
  status: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
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
        state.error = payload as IOrderResponseFail;
      })

      .addDefaultCase((state) => state);
  },
});

export default orderDetailsSlice.reducer;
