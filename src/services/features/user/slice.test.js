import { configureStore } from '@reduxjs/toolkit';
import reducer, { initialState } from './slice';
import { registerUser, loginUser, logoutUser } from './api';

const MOCK_EMAIL = 'janet.weaver@reqres.in';
const MOCK_PASSWORD = '111111';
const MOCK_NAME = 'Janet';
const MOCK_ACCESS_TOKEN = '100500';
const MOCK_REFRESH_TOKEN = '100500';

describe('check user authorization', () => {
  let store = configureStore({
    reducer,
    preloadedState: initialState,
  });

  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState: initialState,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should registration be successful', async () => {
    const mockUser = {
      email: MOCK_EMAIL,
      name: MOCK_NAME,
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        user: mockUser,
        accessToken: MOCK_ACCESS_TOKEN,
        refreshToken: MOCK_REFRESH_TOKEN,
      }),
    });

    await store.dispatch(
      registerUser({ ...mockUser, password: MOCK_PASSWORD })
    );

    expect(store.getState()).toEqual({
      ...initialState,
      user: mockUser,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should login be successful', async () => {
    const mockUser = {
      email: MOCK_EMAIL,
      name: MOCK_NAME,
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        user: mockUser,
        accessToken: MOCK_ACCESS_TOKEN,
        refreshToken: MOCK_REFRESH_TOKEN,
      }),
    });

    await store.dispatch(
      loginUser({ email: MOCK_EMAIL, password: MOCK_PASSWORD })
    );

    expect(store.getState()).toEqual({
      ...initialState,
      user: mockUser,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should logout be successful', async () => {
    const mockUser = { email: MOCK_EMAIL, name: MOCK_NAME };
    const storeAuth = configureStore({
      reducer,
      preloadedState: { ...initialState, user: mockUser },
    });

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        message: 'Successful logout',
      }),
    });

    await storeAuth.dispatch(logoutUser());

    expect(store.getState()).toEqual({
      ...initialState,
      user: null,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
