import { configureStore } from '@reduxjs/toolkit';
import { API } from 'utils/constants';
import reducer, { initialState } from './slice';
import sendOrder from './api';

describe('check sending order function', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState: initialState,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should send an order successfully', async () => {
    const order = [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0947',
    ];
    const orderResponseSuccess = {
      success: true,
      name: 'Космический бургер',
      order: { number: 100500 },
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(orderResponseSuccess),
    });

    await store.dispatch(
      sendOrder({
        order,
        token: '100500',
      })
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API.baseUrl}${API.endpoints.orders}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 100500',
        },
        body: JSON.stringify({ ingredients: order }),
      }
    );

    expect(store.getState()).toEqual({
      ...initialState,
      order: orderResponseSuccess,
    });
  });

  it('should send an order fail', async () => {
    const order = [];
    const orderResponseFail = {
      ok: false,
      status: 500,
    };

    jest.spyOn(global, 'fetch').mockRejectedValue({
      ok: false,
      status: 500,
    });

    await store.dispatch(
      sendOrder({
        order,
        token: '100500',
      })
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API.baseUrl}${API.endpoints.orders}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 100500',
        },
        body: JSON.stringify({ ingredients: order }),
      }
    );

    expect(store.getState()).toEqual({
      ...initialState,
      error: orderResponseFail,
    });
  });
});
