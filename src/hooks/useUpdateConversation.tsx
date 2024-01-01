import { queryClient } from '../contexts/queryClient';
// import { useToast } from './useToast';
import { TConversationState } from '../types/Conversation';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';

export function useUpdateConversation(conversationId: string) {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  // const { showToast } = useToast();
  const { logError } = useErrorLogging();

  const updateConversation = async (updatedData: any) => {
    try {
      await new ClimateApi(sessionId, accessToken).putOneConversation({
        conversationId,
        updatedConversation: updatedData,
      });
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      // showToast({
      //   message: 'Sorry, there was a problem updating the conversation',
      //   type: 'error',
      // });
      logError(err);
    }
  };

  // TODO: CM-1080 Do Not use this one. User the generic one above and refeactor
  const updateConversationState = async (state: TConversationState) => {
    try {
      await new ClimateApi(sessionId, accessToken).putOneConversation({
        conversationId,
        updatedConversation: { state },
      });
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      // showToast({
      //   message: 'Sorry, there was a problem updating the conversation',
      //   type: 'error',
      // });
      logError(err);
    }
  };

  return {
    updateConversationState,
    updateConversation,
  };
}
