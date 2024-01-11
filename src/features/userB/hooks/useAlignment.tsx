import { GetAlignmentScores } from 'api/responses';
import { useEffect, useState } from 'react';
import { useApiClient } from 'shared/hooks';

function useAlignment(conversationId: string, quizId: string) {
  const apiClient = useApiClient();

  const [isLoading, setIsLoading] = useState(false);
  const [alignmentScores, setAlignmentScores] = useState<GetAlignmentScores>();

  async function postAlignmentScores(conversationId: string, quizId: string) {
    return await apiClient.postAlignment(conversationId, quizId);
  }

  async function getAlignmentScores(alignmentScoresId: string) {
    return await apiClient.getAlignmentScores(alignmentScoresId);
  }

  useEffect(() => {
    async function doAlignment() {
      setIsLoading(true);

      const { alignmentScoresId } = await postAlignmentScores(conversationId, quizId);
      const alignmentScores = await getAlignmentScores(alignmentScoresId);

      setAlignmentScores(alignmentScores);
      setIsLoading(false);
      return alignmentScores;
    }

    doAlignment();
  }, [conversationId, quizId]);

  return { isLoading, alignmentScores };
}

export default useAlignment;
