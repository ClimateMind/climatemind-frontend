import { climateApi } from './apiHelper';
import { TUser } from '../types/User';

export type refreshResponse = {
  access_token: string;
  message: string;
  user: TUser;
};

export const postRefresh = async (): Promise<refreshResponse> => {
  // const REQUEST_URL = buildUrl('/refresh');

  try {
    // Call the api
    const response = await climateApi('/refresh', {
      method: 'post',
      withCredentials: true,
    });
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export default postRefresh;
