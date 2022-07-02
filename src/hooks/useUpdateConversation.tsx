import { updateOneConversation } from '../api/updateOneConversation';
import { queryClient } from '../contexts/queryClient';
import { useToast } from './useToast';

export function useUpdateConversation(conversationId: string) {
  const { showToast } = useToast();

  const updateConversationStatusToTalked = async () => {
    try {
      await updateOneConversation(conversationId, {
        buttonClicked: 'talked',
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
    updateConversationStatusToTalked,
  };
}
