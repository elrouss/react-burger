import { RootState } from 'services/app/store';

export const isLoading = (state: RootState) => state.orderDetails.status;
export const getCurrentOrderNumber = (state: RootState) =>
  state.orderDetails.order?.order.number;
