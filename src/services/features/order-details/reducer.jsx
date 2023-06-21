import { createAction, createReducer } from '@reduxjs/toolkit';

export const SAVE_ORDER_DETAILS = createAction(
  'orderDetails/save_order_details'
);
export const RESET_ORDER_DETAILS = createAction(
  'orderDetails/reset_order_details'
);

const initialState = {
  order: null,
};

const orderDetailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SAVE_ORDER_DETAILS, (state, { payload }) => {
      state.order = payload;
    })

    .addCase(RESET_ORDER_DETAILS, () => initialState)

    .addDefaultCase((state) => state);
});

export default orderDetailsReducer;
