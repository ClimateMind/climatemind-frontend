import { climateApi } from './apiHelper';

export type postRecaptchaResponse = {
    challenge_ts: string;
    hostname: string;
    success: boolean;
};

export const postRecaptchaToken = async (token:string): Promise<postRecaptchaResponse> => {
    const url = `/captcha?recaptchaResponse=${token}`;
    try {
      const request = await climateApi.post(
        url,
        { withCredentials: true }
      );
      return request.data;
    } catch (err) {
      throw err;
    }
};

export default postRecaptchaToken;
