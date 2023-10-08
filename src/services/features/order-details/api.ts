import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'utils/constants';
import { IOrderResponseSuccess, IOrderResponseFail } from './types';

type TOrder = {
  order: string[];
  token: string;
};

const sendOrder = createAsyncThunk<
  IOrderResponseSuccess,
  TOrder,
  { rejectValue: IOrderResponseFail }
>('orderDetails/sendOrder', async (data) => {
  const { order, token } = data;

  const res = await fetch(`${API.baseUrl}${API.endpoints.orders}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredients: order }),
  });

  if (!res.ok) {
    return Promise.reject(new Error(`Error ${res.status}`));
  }

  return (await res.json()) as IOrderResponseSuccess;
});

export default sendOrder;
