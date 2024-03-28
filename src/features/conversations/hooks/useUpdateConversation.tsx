import { queryClient } from 'App';
import { useApiClient, useToastMessage } from 'shared/hooks';

interface IUpdateConversation {
  state: number;
  receiverName: string;
  userARating: number;
}

function useUpdateConversation() {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();

  async function updateConversation(conversationId: string, updatedConversation: Partial<IUpdateConversation>) {
    try {
      await apiClient.putSingleConversation({ conversationId, updatedConversation });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    } catch (error) {
      showErrorToast(error.response.data.error ?? 'Sorry, there was a problem updating the conversation');
    }
  }

  return {
    updateConversation,
  };
}

export default useUpdateConversation;
