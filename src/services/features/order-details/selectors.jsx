export const isLoading = (state) => state.orderDetails.status;
export const getCurrentOrderNumber = (state) =>
  state.orderDetails.order?.order.number;
