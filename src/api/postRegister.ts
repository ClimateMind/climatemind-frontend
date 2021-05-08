import axios from 'axios';
import { buildUrl } from './apiHelper';

export type registrationPayload = {
  fullname: string;
  password: string;
  email: string;
  sessionId?: string;
};

type response = {
  access_token: string;
};

export const postRegister = async ({
  fullname,
  sessionId,
  password,
  email,
}: registrationPayload): Promise<response> => {
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
