import { climateApi } from './apiHelper';

interface Response {
  message: string;
}

export const postLogout = async (): Promise<Response> => {
  try {
    // Make request for token
    const request = await climateApi.post(
      '/logout',
      {},
      { withCredentials: true }
    );
    return request.data;
  } catch (err) {
    throw err;
  }
};
