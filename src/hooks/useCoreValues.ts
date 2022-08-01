import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getPersonalValues from '../api/getPersonalValues';
import { TPersonalValues } from '../types/PersonalValues';
import { useSession } from './useSession';

export const useCoreValues = () => {
  // const { showToast } = useToast();
  const [values, setValues] = useState({} as TPersonalValues);
  const { quizId } = useSession();

  // Get the data
  const { data, isLoading, isError } = useQuery(['values', quizId], () => {
    if (quizId) {
      return getPersonalValues(quizId);
    }
  });

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  const { personalValues, valueScores } = values;

  return { personalValues, valueScores, isError, isLoading };
};
