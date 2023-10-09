import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import { API } from 'utils/constants';
import {
  IAccessToken,
  IUserRegistration,
  IUserLogin,
  IUserEditInfo,
  IUserAuthResponse,
  IUserEditInfoResponse,
  IUserLogoutResponse,
} from './types';

const checkIsAccessTokenExpired = (token: string): boolean => {
  const MILLISECOND = 1;
  const expirationData = jwtDecode<IAccessToken>(token).exp;

  return dayjs.unix(expirationData).diff(dayjs()) < MILLISECOND;
};

// eslint-disable-next-line consistent-return
export const refreshAccessToken = async () => {
  try {
    const res = await fetch(
      `${API.baseUrl}${API.endpoints.user.tokenRefresh}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      }
    );

    if (!res.ok) {
      Promise.reject(new Error(`Error ${res.status}`));
    }

    const { accessToken, refreshToken } = await res.json();

    localStorage.setItem('accessToken', accessToken.split(' ')[1]);
    localStorage.setItem('refreshToken', refreshToken);

    return localStorage.getItem('accessToken');
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

export const registerUser = createAsyncThunk<
  IUserAuthResponse,
  IUserRegistration,
  { rejectValue: unknown }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API.baseUrl}${API.endpoints.user.register}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      Promise.reject(new Error(`Error ${res.status}`));
    }

    return (await res.json()) as IUserAuthResponse;
  } catch (err) {
    return rejectWithValue(`User registration error: ${err}`);
  }
});

export const loginUser = createAsyncThunk<
  IUserAuthResponse,
  IUserLogin,
  { rejectValue: unknown }
>('user/login', async (data) => {
  const res = await fetch(`${API.baseUrl}${API.endpoints.user.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    Promise.reject(new Error(`Error ${res.status}`));
  }

  return (await res.json()) as IUserAuthResponse;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const res = await fetch(`${API.baseUrl}${API.endpoints.user.logout}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });

  if (!res.ok) {
    Promise.reject(new Error(`Error ${res.status}`));
  }

  return (await res.json()) as IUserLogoutResponse;
});

export const checkUserAuth = createAsyncThunk(
  'user/auth',
  async (_, { rejectWithValue }) => {
    let token: string | null | undefined = localStorage.getItem('accessToken');

    if (!token) return null;

    if (checkIsAccessTokenExpired(token)) {
      token = await refreshAccessToken();
    }

    try {
      const res = await fetch(`${API.baseUrl}${API.endpoints.user.data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        Promise.reject(new Error(`Error ${res.status}`));
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(`User get data error: ${err}`);
    }
  }
);

export const editUserData = createAsyncThunk<
  IUserEditInfoResponse,
  IUserEditInfo,
  { rejectValue: unknown }
>('user/editData', async (data, { rejectWithValue }) => {
  let token: string | null | undefined = localStorage.getItem('accessToken');

  if (token && checkIsAccessTokenExpired(token)) {
    token = await refreshAccessToken();
  }

  try {
    const res = await fetch(`${API.baseUrl}${API.endpoints.user.data}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      Promise.reject(new Error(`Error ${res.status}`));
    }

    return (await res.json()) as IUserEditInfoResponse;
  } catch (err) {
    return rejectWithValue(`User edit error: ${err}`);
  }
});
