import { climateApi } from './apiHelper';

export type postPasswordResetLinkPayload = {
  email: string;
};

export type postPasswordResetLinkResponse = {
  message: string;
};

export const postPasswordResetLink = async ({
  email,
}: postPasswordResetLinkPayload): Promise<postPasswordResetLinkResponse> => {
  const url = '/password-reset';

  try {
    const request = await climateApi({
      method: 'post',
      url,
      data: {
        email,
      },
    });
    return request.data;
  } catch (err) {
    throw err;
  }
};
