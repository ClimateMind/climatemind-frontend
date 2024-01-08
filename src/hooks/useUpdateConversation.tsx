import { queryClient } from '../contexts/queryClient';
import { TConversationState } from '../types/Conversation';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useToastMessage } from 'shared/hooks';
import { useAppSelector } from 'store/hooks';

export function useUpdateConversation(conversationId: string) {
  const { sessionId, user } = useAppSelector(state => state.auth);

  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();

  const updateConversation = async (updatedData: any) => {
    try {
      await new ClimateApi(sessionId, user.accessToken).putOneConversation({
        conversationId,
        updatedConversation: updatedData,
      });
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      showErrorToast('Sorry, there was a problem updating the conversation');
      logError(err);
    }
  };

  // TODO: CM-1080 Do Not use this one. User the generic one above and refeactor
  const updateConversationState = async (state: TConversationState) => {
    try {
      await new ClimateApi(sessionId, user.accessToken).putOneConversation({
        conversationId,
        updatedConversation: { state },
      });
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      showErrorToast('Sorry, there was a problem updating the conversation');
      logError(err);
    }
  };

  return {
    updateConversationState,
    updateConversation,
  };
}
