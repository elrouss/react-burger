import { API } from './constants';
import { request } from './api/request';

export const rememberPassword = async (email: { email: string }) =>
  request(API.endpoints.user.password.forgot, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });

export const resetPassword = async (data: {
  password: string;
  token: string;
}) =>
  request(API.endpoints.user.password.reset, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
