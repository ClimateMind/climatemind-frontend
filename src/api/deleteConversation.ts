import { climateApi } from './apiHelper';

type TConversationResponse = {
  conversationId: string;
  message: string;
};

export const deleteConversation = async (
  conversationId: string,
  jwt?: string
): Promise<TConversationResponse> => {
  const CONVESATIONS_ENDPOINT = `/conversation/${conversationId}`;
  const HEADERS = { Authorization: jwt ? `Brearer ${jwt}` : '' };

  try {
    const response = await climateApi.delete(CONVESATIONS_ENDPOINT, {
      headers: HEADERS,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};
