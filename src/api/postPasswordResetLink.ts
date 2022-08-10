import { climateApi } from './apiHelper';

export type passwordResetLinkPayload = {
  email: string;
};

export type passwordResetLinkResponse = {
  message: string;
};

export const postPasswordResetLink = async ({
  email,
}: passwordResetLinkPayload): Promise<passwordResetLinkResponse> => {
  const url = '/password-reset';

  try {
    const request = await climateApi({
      method: 'post',
      url,
      data: {
        email,
      },
      withCredentials: true,
    });
    return request.data;
  } catch (err) {
    throw err;
  }
};
