import { useQuery } from '@tanstack/react-query';
import { useApiClient, useToastMessage } from 'shared/hooks';

function useSharedImpacts(alignmentScoresId?: string, impactId?: string) {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();

  // Step 1: Get the full list of shared impacts for userB to select one
  const impacts = useQuery({
    queryKey: ['sharedImpacts', alignmentScoresId],
    queryFn: () => apiClient.getSharedImpacts(alignmentScoresId!),
    enabled: !!alignmentScoresId,
  });

  // Step 1.1: Get details for a specific shared impact
  const impact = useQuery({
    queryKey: ['sharedImpact', impactId],
    queryFn: () => apiClient.getSharedImpactDetails(impactId!),
    enabled: !!impactId,
  });

  // Step 2: UserB chooses one shared impact
  async function chooseSharedImpact(alignmentScoresId: string, impactId: string) {
    try {
      return await apiClient.postSharedImpacts(alignmentScoresId, [{ effectId: impactId }]);
    } catch (error) {
      showErrorToast(error.response.data.error ?? 'Error choosing shared impact');
      return undefined;
    }
  }

  return {
    impacts: impacts.data,
    impact: impact.data,
    chooseSharedImpact,
  };
}

export default useSharedImpacts;
