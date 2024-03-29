import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useGetQuestions() {
  const apiClient = useApiClient();

  const questions = useQuery({
    queryKey: ['questions'],
    queryFn: () => apiClient.getQuestions().then(result => {
      const SetOne = result.SetOne.reverse();
      const SetTwo = result.SetTwo.reverse();
      return { SetOne, SetTwo };
    }),
    staleTime: Infinity,
  });

  return {
    questions: questions.data,
    isLoading: questions.isPending,
  }
}

export default useGetQuestions;
