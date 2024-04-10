import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useApiClient, useToastMessage } from 'shared/hooks';

import { setAlignmentScoresId } from '../state/userBSlice';

function useAlignment(alignmentScoresId?: string) {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();
  // Inside a component
  const dispatch = useDispatch();

  // Step 1: Determine how userA and userB align on the quiz and get the alignmentScoresId
  async function createAlignment(conversationId: string, quizId: string) {
    try {
      let result = await apiClient.postAlignment(conversationId, quizId);
      dispatch(setAlignmentScoresId(result.alignmentScoresId));
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
