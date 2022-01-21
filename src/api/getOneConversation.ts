import { TConversation } from '../types/Conversation';
import { climateApi } from './apiHelper';

export const getOneConversation = async (
  conversationId: string
): Promise<TConversation> => {
  const CONVESATIONS_ENDPOINT = `/conversation/${conversationId}`;
  try {
    // Call the api
    const response = await climateApi.get(CONVESATIONS_ENDPOINT);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};
