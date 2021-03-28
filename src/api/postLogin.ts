import axios from 'axios';

type payload = {
  username: string;
  password: string;
};

type response = {
  access_token: string;
};

export const postLogin = async ({
  username,
  password,
}: payload): Promise<response> => {
  try {
    // Make request for token
    const request = await axios.post(
      'http://localhost:5000/login',
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err) {
    throw err;
  }
};
