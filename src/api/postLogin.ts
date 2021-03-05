import axios from 'axios';

type payload = {
  username: string;
  password: string;
};

export const postLogin = async ({ username, password }: payload) => {
  try {
    // Make request for token
    const request = await axios({
      method: 'post',
      url: 'http://localhost:8000/api/login',
      data: {
        username: username,
        password: password,
      },
    });
    return request.data;
  } catch (err) {
    throw err;
  }
};
