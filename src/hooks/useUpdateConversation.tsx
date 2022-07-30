import { updateOneConversation } from '../api/updateOneConversation';
import { queryClient } from '../contexts/queryClient';
import { useToast } from './useToast';
import { TConversationState } from '../types/Conversation';

export function useUpdateConversation(conversationId: string) {
  const { showToast } = useToast();

  const updateConversation = async (updatedData: any) => {
    try {
      await updateOneConversation(conversationId, updatedData);
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      showToast({
        message: 'Sorry, there was a problem adding a rating',
        type: 'error',
      });
    }
  };

  const updateConversationState = async (state: TConversationState) => {
    try {
      await updateOneConversation(conversationId, {
        state,
      });
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      showToast({
        message: 'Sorry, there was a problem updating the conversation',
        type: 'error',
      });
    }
  };

  return {
    updateConversationState,
    updateConversation,
  };
}
