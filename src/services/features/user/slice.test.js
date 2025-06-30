import { configureStore } from '@reduxjs/toolkit';
import { API } from 'utils/constants';
import reducer, { initialState } from './slice';
import { registerUser, loginUser, logoutUser, editUserData } from './api';

const MOCK_EMAIL = 'janet.weaver@reqres.in';
const MOCK_PASSWORD = '111111';
const MOCK_NAME = 'Janet';
const MOCK_ACCESS_TOKEN = '100500';
const MOCK_REFRESH_TOKEN = '100500';

const mockUser = {
  email: MOCK_EMAIL,
  name: MOCK_NAME,
};

describe('check user authorization', () => {
  let store;

  const mockSuccessResponse = {
    success: true,
    user: mockUser,
    accessToken: MOCK_ACCESS_TOKEN,
    refreshToken: MOCK_REFRESH_TOKEN,
  };

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

  it('should registration be successful', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockSuccessResponse),
    });

    await store.dispatch(
      registerUser({ ...mockUser, password: MOCK_PASSWORD })
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API.baseUrl}${API.endpoints.user.register}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...mockUser, password: MOCK_PASSWORD }),
      }
    );

    expect(store.getState()).toEqual({
      ...initialState,
      user: mockUser,
    });
  });

  it('should registration be fail', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        success: false,
        message: 'Something went wrong',
      }),
    });

    await store.dispatch(
      registerUser({ ...mockUser, password: MOCK_PASSWORD })
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API.baseUrl}${API.endpoints.user.register}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...mockUser, password: MOCK_PASSWORD }),
      }
    );

    expect(store.getState()).toEqual({
      ...initialState,
      process: {
        ...initialState.process,
        error: `User registration error: ${{
          success: false,
          message: 'Something went wrong',
        }}`,
      },
    });
  });

  it('should login be successful', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockSuccessResponse),
    });

    await store.dispatch(
      loginUser({ email: MOCK_EMAIL, password: MOCK_PASSWORD })
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API.baseUrl}${API.endpoints.user.login}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: MOCK_EMAIL, password: MOCK_PASSWORD }),
      }
    );

    expect(store.getState()).toEqual({
      ...initialState,
      user: mockUser,
    });
  });

  it('should login be fail', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        success: false,
        message: 'Something went wrong',
      }),
    });

    await store.dispatch(
      loginUser({ email: MOCK_EMAIL, password: MOCK_PASSWORD })
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API.baseUrl}${API.endpoints.user.login}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: MOCK_EMAIL, password: MOCK_PASSWORD }),
      }
    );

    expect(store.getState()).toEqual({
      ...initialState,
      process: {
        ...initialState.process,
        error: `User login error: ${{
          success: false,
          message: 'Something went wrong',
        }}`,
      },
    });
  });
});

describe('check user manipulating with data', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState: {
        ...initialState,
        user: { email: MOCK_EMAIL, name: MOCK_NAME },
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should logout be successful', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        message: 'Successful logout',
      }),
    });

    await store.dispatch(logoutUser());

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      user: null,
    });
  });

  it("should editing user's personal data be successful", async () => {
    const newUserPersonalData = { email: 'jasper@test.com', name: 'Jasper' };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        user: newUserPersonalData,
      }),
    });

    await store.dispatch(editUserData(newUserPersonalData));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      user: newUserPersonalData,
    });
  });

  it("should editing user's personal data be fail", async () => {
    const newUserPersonalData = { email: 'jaspertest.com', name: 'Jasper' };

    jest.spyOn(global, 'fetch').mockRejectedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        success: false,
        message: 'Something went wrong',
      }),
    });

    await store.dispatch(editUserData(newUserPersonalData));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      user: { email: MOCK_EMAIL, name: MOCK_NAME },
      process: {
        ...initialState.process,
        error: `User edit error: ${{
          success: false,
          message: 'Something went wrong',
        }}`,
      },
    });
  });
});
