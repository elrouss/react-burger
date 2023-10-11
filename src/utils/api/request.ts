import { API } from 'utils/constants';

const checkResponse = (res: Response) => {
  if (!res.ok) {
    Promise.reject(new Error(`Error ${res.status}`));
  }

  return res.json();
};

export const request = async (
  endpoint: string,
  options: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: HeadersInit;
    body?: BodyInit | null;
  },
  baseUrl: string = API.baseUrl
) => {
  const res = await fetch(`${baseUrl}${endpoint}`, options);
  const resBody = await checkResponse(res);

  return resBody;
};
