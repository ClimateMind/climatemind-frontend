import { climateApi } from './apiHelper';

export type recordUserBVisitResponse = {
  message: string;
};

export const recordUserBVisitApi = async (
  conversationId: string
): Promise<recordUserBVisitResponse> => {
  const url = `/user-b/${conversationId}`;

  try {
    // Make request for token
    const request = await climateApi.post(url);
    return request.data;
  } catch (err) {
    throw err;
  }
};
