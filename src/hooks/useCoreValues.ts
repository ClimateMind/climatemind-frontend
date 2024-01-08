import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { useApiClient } from 'shared/hooks';

export const useCoreValues = () => {
  const apiClient = useApiClient();
  const { user } = useAppSelector(state => state.auth);
  const [values, setValues] = useState({} as any);

  useEffect(() => {
    apiClient.getPersonalValues(user.quizId).then(data => {
      setValues({ ...data });
    });
  }, []);

  const { personalValues, valueScores } = values;

  return { personalValues, valueScores, isError: false, isLoading: false };
};
