import { TUser } from '../types/User';
import { climateApi } from '../api/apiHelper';

export type loginPayload = {
  email: string;
  password: string;
  recaptchaToken:string;
};

export type loginResponse = {
  access_token: string;
  message: string;
  user: TUser;
};

export const postLogin = async ({
  email,
  password,
  recaptchaToken,
}: loginPayload): Promise<loginResponse> => {
  const url = `/login?recaptchaToken=${recaptchaToken}`;
  try {
    // Make request for token
    const request = await climateApi.post(
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
