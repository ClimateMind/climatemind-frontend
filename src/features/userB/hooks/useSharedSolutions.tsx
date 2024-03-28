import { useQuery } from '@tanstack/react-query';
import { useApiClient, useToastMessage } from 'shared/hooks';

function useSharedSolutions(alignmentScoresId?: string, solutionId?: string) {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();

  // Step 1: Get the full list of shared solutions for userB to select two
  const solutions = useQuery({
    queryKey: ['sharedSolutions', alignmentScoresId],
    queryFn: () => apiClient.getSharedSolutions(alignmentScoresId!),
    enabled: !!alignmentScoresId,
  });

  // Step 1.1: Get details for a specific shared solution
  const solution = useQuery({
    queryKey: ['sharedSolution', solutionId],
    queryFn: () => apiClient.getSharedSolutionDetails(solutionId!),
    enabled: !!solutionId,
  });

  // Step 2: UserB chooses two shared solutions
  async function chooseSharedSolutions(alignmentScoresId: string, solutionIds: string[]) {
    try {
      return await apiClient.postSharedSolutions(alignmentScoresId, solutionIds.map((solutionId) => ({ solutionId })));
    } catch (error) {
      showErrorToast(error.response.data.error ?? 'Error choosing shared solution');
      return undefined;
    }
  }

  return {
    solutions: solutions.data,
    solution: solution.data,
    chooseSharedSolutions,
  };
}

export default useSharedSolutions;
