import {
  updateOneConversation,
  UpdateConversationProps,
} from '../api/updateOneConversation';
import { queryClient } from '../contexts/queryClient';
import { useToast } from './useToast';
import { TConversationState } from '../types/Conversation';

export function useUpdateConversation(conversationId: string) {
  const { showToast } = useToast();

  const updateConversation = async (updatedData: UpdateConversationProps) => {
    try {
      await updateOneConversation(conversationId, updatedData);
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      showToast({
        message: 'Sorry, there was a problem updating the conversation',
        type: 'error',
      });
    }
  };

  // TODO: CM-1080 Do Not use this one. User the generic one above and refeactor
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
