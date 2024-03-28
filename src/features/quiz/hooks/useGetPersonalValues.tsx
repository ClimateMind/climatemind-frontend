import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useGetPersonalValues(quizId: string) {
  const apiClient = useApiClient();

  const personalValues = useQuery({
    queryKey: ['personalValues', quizId],
    queryFn: () => apiClient.getPersonalValues(quizId),
    enabled: !!quizId,
  });

  return {
    personalValues: personalValues.data,
  };
}

export default useGetPersonalValues;
