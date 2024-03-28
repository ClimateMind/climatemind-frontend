import { useQuery } from '@tanstack/react-query';
import { useApiClient, useToastMessage } from 'shared/hooks';

function useAlignment(alignmentScoresId?: string) {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();

  // Step 1: Determine how userA and userB align on the quiz and get the alignmentScoresId
  async function createAlignment(conversationId: string, quizId: string) {
    try {
      return await apiClient.postAlignment(conversationId, quizId);
    } catch (error) {
      showErrorToast(error.response.data.error ?? 'Error creating alignment');
      return undefined;
    }
  }

  // Step 2: Get the alignment scores for the previously determined alignmentScoresId
  const alignmentScores = useQuery({
    queryKey: ['alignmentScores', alignmentScoresId],
    queryFn: () => apiClient.getAlignmentScores(alignmentScoresId!),
    enabled: !!alignmentScoresId,
  });

  // Step 3: Get the summary, i.e. top matched value, shared impacts and shared solutions
  const alignmentSummary = useQuery({
    queryKey: ['alignmentSummary', alignmentScoresId],
    queryFn: () => apiClient.getAlignmentSummary(alignmentScoresId!),
    enabled: !!alignmentScoresId,
  });

  return {
    createAlignment,
    alignmentScores,
    alignmentSummary,
  };
}

export default useAlignment;
