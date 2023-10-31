import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'utils/constants';
import { request } from 'utils/api/request';
import { IOrderResponseSuccess } from './types';

type TOrder = {
  order: string[];
  token: string;
};

const sendOrder = createAsyncThunk<
  IOrderResponseSuccess,
  TOrder,
  { rejectValue: unknown }
>('orderDetails/sendOrder', async (data, { rejectWithValue }) => {
  const { order, token } = data;
  try {
    return await request(API.endpoints.orders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ingredients: order }),
    });
  } catch (err) {
    return rejectWithValue(err);
  }
});

export default sendOrder;
