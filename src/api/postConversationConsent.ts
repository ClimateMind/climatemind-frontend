import { climateApi } from './apiHelper';

type PostConversationConsentResponse = {
  message: string;
};

export const postConversationConsent = async (
  conversationId: string
): Promise<PostConversationConsentResponse> => {
  const CONVERSATION_CONSENT_ENDPOINT = `/conversation/${conversationId}/consent`;
  try {
    // Call the api
    const response = await climateApi.post(CONVERSATION_CONSENT_ENDPOINT, {
      consent: true,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error`, err.message);
    throw err;
  }
};
