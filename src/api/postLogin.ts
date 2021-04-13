import axios from 'axios';

export type loginPayload = {
  email: string;
  password: string;
};

type response = {
  access_token: string;
};

export const postLogin = async ({
  email,
  password,
}: loginPayload): Promise<response> => {
  try {
    // Make request for token
    const request = await axios.post(
      'http://localhost:5000/login',
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
