import axios from 'axios';
import { buildUrl } from './apiHelper';

export type registrationPayload = {
  fullname: string;
  password: string;
  email: string;
  sessionId?: string;
};

export type registrationResponse = {
  access_token: string;
  message: string;
  user: {
    email: string;
    full_name: string;
    user_uuid: string;
  };
};

export const postRegister = async ({
  fullname,
  sessionId,
  password,
  email,
}: registrationPayload): Promise<registrationResponse> => {
  const url = buildUrl('/register');

  try {
    // Make request for token
    const request = await axios({
      method: 'post',
      url,
      data: {
        fullname,
        sessionId,
        password,
        email,
      },
    });
    return request.data;
  } catch (err) {
    throw err;
  }
};
