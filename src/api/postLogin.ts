import axios from 'axios';
import { buildUrl } from './apiHelper';
import { TUser } from '../types/User';

export type loginPayload = {
  email: string;
  password: string;
};

export type loginResponse = {
  access_token: string;
  message: string;
  user: TUser;
};

export const postLogin = async ({
  email,
  password,
}: loginPayload): Promise<loginResponse> => {
  const url = buildUrl('/login');
  try {
    // Make request for token
    const request = await axios.post(
      url,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err) {
    throw err;
  }
};
