import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useGetPersonalValues(quizId: string) {
  const apiClient = useApiClient();

  const personalValues = useQuery({
    queryKey: ['personalValues', quizId],
    queryFn: () => apiClient.getPersonalValues(quizId),
  });

  return {
    personalValues: personalValues.data,
    isLoading: personalValues.isLoading,
  };
}

export default useGetPersonalValues;
