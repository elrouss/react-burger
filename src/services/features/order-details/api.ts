import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'utils/constants';
import { request } from 'utils/api/request';
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

  return request(API.endpoints.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredients: order }),
  });
});

export default sendOrder;
