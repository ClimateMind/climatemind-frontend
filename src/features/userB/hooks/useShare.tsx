import { useApiClient, useToastMessage } from 'shared/hooks';

function useShare() {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();

  /**
   * Get the summary, i.e. top matched value, shared impacts and shared solutions.
   * !! Also exists in useAlignment
   */
  async function getSharedSummary(alignmentScoresId: string) {
    try {
      return await apiClient.getAlignmentSummary(alignmentScoresId);
    } catch (error) {
      showErrorToast(error.response.data.error ?? 'Error getting shared summary');
      return undefined;
    }
  }

  // Get the list of impacts and soluctions selected by userB.
  async function getSharedTopics(conversationId: string) {
    try {
      return await apiClient.getSelectedTopics(conversationId);
    } catch (error) {
      showErrorToast(error.response.data.error ?? 'Error getting shared topics');
      return undefined;
    }
  }

  // Update if userB has consented to share their data.
  async function consentSharing(conversationId: string) {
    try {
      return await apiClient.postConversationConsent(conversationId);
    } catch (error) {
      showErrorToast(error.response.data.error ?? 'Error updating consent');
      return undefined;
    }
  }

  return {
    getSharedSummary,
    getSharedTopics,
    consentSharing,
  };
}

export default useShare;
