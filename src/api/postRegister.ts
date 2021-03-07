import axios from 'axios';

type payload = {
  username: string;
  password: string;
  email: string;
};

type response = {
  access_token: string;
};

export const postRegister = async ({
  username,
  password,
  email,
}: payload): Promise<response> => {
  try {
    // Make request for token
    const request = await axios({
      method: 'post',
      url: 'http://localhost:5000/register',
      data: {
        username,
        password,
        email,
      },
    });
    return request.data;
  } catch (err) {
    throw err;
  }
};
