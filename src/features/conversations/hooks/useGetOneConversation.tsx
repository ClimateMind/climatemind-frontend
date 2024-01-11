import { useApiClient } from 'shared/hooks';

function useGetOneConversation() {
  const apiClient = useApiClient();

  async function getConversation(conversationId: string) {
    const response = await apiClient.getConversation(conversationId);
    return response;
  }

  return { getConversation };
}

export default useGetOneConversation;
