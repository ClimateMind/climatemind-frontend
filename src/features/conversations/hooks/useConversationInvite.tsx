import { useApiClient, useToastMessage } from 'shared/hooks';

function useConversationInvite() {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();

  /**
   * Creates the link to invite a friend to a conversation
   * @param friend The name of the friend
   * @returns The conversation link or null if an error occurred
   */
  async function inviteToConversation(friend: string) {
    try {
      const response = await apiClient.createConversationInvite(friend);
      const link = window.location.origin + '/landing/' + response.conversationId;
      return link;
    } catch (error) {
      showErrorToast(error.response?.data?.error || 'Unknown Error has occurred');
      return null;
    }
  }

  return { inviteToConversation };
}

export default useConversationInvite;
