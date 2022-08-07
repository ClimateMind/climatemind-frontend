import { TSelectedTopics } from '../types/SelectedTopics';
import { climateApi } from './apiHelper';

const getSelectedTopics = async (
  conversationId: string
): Promise<TSelectedTopics> => {
  // Set up the call
  const CONVERSATION_BASE = '/conversation';
  const TOPICS_ENDPOINT = 'topics';
  const REQUEST_URL = `${CONVERSATION_BASE}/${conversationId}/${TOPICS_ENDPOINT}`;
  try {
    // Call the api
    const response = await climateApi.get(REQUEST_URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};

export default getSelectedTopics;
