import { API } from './constants';

export const rememberPassword = async (email) => {
  try {
    const res = await fetch(
      `${API.baseUrl}${API.endpoints.user.password.forgot}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!res.ok) {
      return Promise.reject(new Error(`Error ${res.status}`));
    }

    return res.json();
  } catch (err) {
    console.error(`Remember password error: ${err}`);
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await fetch(
      `${API.baseUrl}${API.endpoints.user.password.reset}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      return Promise.reject(new Error(`Error ${res.status}`));
    }

    return await res.json();
  } catch (err) {
    console.error(`Reset password error: ${err}`);
  }
};
