import { climateApi } from './apiHelper';

export type putPasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type putPasswordResponse = {
  message: string;
  anyFieldName?: string[];
  anyFieldName1?: string[];
};

export const putPassword = async ({
  currentPassword,
  newPassword,
  confirmPassword,
}: putPasswordPayload): Promise<putPasswordResponse> => {
  const url = '/user-account';

  try {
    // Make request for token
    const request = await climateApi.put(url, {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return request.data;
  } catch (err) {
    throw err;
  }
};
