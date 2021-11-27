import { TConversation } from '../types/Conversation';
import { climateApi } from './apiHelper';

export type Response = {
  conversations: TConversation[];
};

export const getConversations = async (): Promise<Response> => {
  // Set up the call
  const CONVESATIONS_ENDPOINT = '/conversations';
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

export default getConversations;
