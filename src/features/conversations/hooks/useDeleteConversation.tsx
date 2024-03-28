import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'App';
import { GetAllConversations } from 'api/responses';
import { useErrorLogging } from 'shared/hooks/useErrorLogging';
import { useApiClient, useToastMessage } from 'shared/hooks';

function useDeleteConversation() {
  const apiClient = useApiClient();
  const { showErrorToast, showSuccessToast } = useToastMessage();
  const { logError } = useErrorLogging();

  // When deleting a conversation, we use optimistic updates to remove the conversation from the list
  // before the server responds. If there is an error, we revert the change.
  const deleteConversationMutation = useMutation<void, Error, string, any>({
    mutationFn: (id: string) => apiClient.deleteConversation(id),
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['conversations'] });

      // Snapshot the previous value
      const previousConversations = queryClient.getQueryData<{ conversations: GetAllConversations[] }>(['conversations']);

      // Optimistically update to the new value
      queryClient.setQueryData(['conversations'], (old: any) => {
        const newData = old.conversations.filter((conversation: any) => conversation.conversationId !== id);
        return { conversations: newData };
      });

      // Return a context object with the snapshotted value
      return { previousConversations };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error: any, _, context) => {
      queryClient.setQueryData(['conversations'], context.previousConversations);
      showErrorToast(error.response?.data?.error || 'Error deleting conversation');
      logError(error);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations']});
    },
    onSuccess: () => {
      showSuccessToast('Conversation deleted');
    },
  });

  return {
    deleteConversation: deleteConversationMutation.mutate,
  };
}

export default useDeleteConversation;
