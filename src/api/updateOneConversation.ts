import { TConversation } from '../types/Conversation';
import { climateApi } from './apiHelper';

interface UpdateConversationProps {
  // conversationStatus?: TConversationStatus;
  buttonClicked: 'talked';
  receiverName?: string;
  userARating?: number;
}

export const updateOneConversation = async (
  conversationId: string,
  updatedConversation: UpdateConversationProps
): Promise<TConversation> => {
  const CONVESATIONS_ENDPOINT = `/conversation/${conversationId}`;
  try {
    // Call the api
    const response = await climateApi.put(
      CONVESATIONS_ENDPOINT,
      updatedConversation
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};
