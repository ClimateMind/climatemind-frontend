import axios from 'axios';

export type registrationPayload = {
  password: string;
  email: string;
};

type response = {
  access_token: string;
};

export const postRegister = async ({
  password,
  email,
}: registrationPayload): Promise<response> => {
  try {
    // Make request for token
    const request = await axios({
      method: 'post',
      url: 'http://localhost:5000/register',
      data: {
        password,
        email,
      },
    });
    return request.data;
  } catch (err) {
    throw err;
  }
};
