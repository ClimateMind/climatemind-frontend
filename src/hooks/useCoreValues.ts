import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { useApiClient } from 'shared/hooks';

export const useCoreValues = () => {
  const apiClient = useApiClient();
  const { quizId } = useAppSelector(state => state.auth.userB);
  const [values, setValues] = useState({} as any);

  useEffect(() => {
    if (quizId) {
      apiClient.getPersonalValues(quizId).then(data => {
        setValues({ ...data });
      });
    }
  }, [quizId]);

  const { personalValues, valueScores } = values;

  return { personalValues, valueScores, isError: false, isLoading: false };
};
