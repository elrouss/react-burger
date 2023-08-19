import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'utils/constants';
import { IOrderResponseSuccess, IOrderResponseFail } from './types';

const sendOrder = createAsyncThunk<
  IOrderResponseSuccess,
  string[],
  { rejectValue: IOrderResponseFail }
>('orderDetails/sendOrder', async (order) => {
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

  return (await res.json()) as IOrderResponseSuccess;
});

export default sendOrder;
