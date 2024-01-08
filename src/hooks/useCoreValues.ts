import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { TPersonalValues } from '../types/PersonalValues';
import { useAppSelector } from 'store/hooks';

export const useCoreValues = () => {
  const [values, setValues] = useState({} as TPersonalValues);
  const { sessionId, user } = useAppSelector(state => state.auth);

  // Get the data
  const { data, isLoading, isError } = useQuery(['values', user.quizId], () => {
    if (user.quizId) {
      return new ClimateApi(sessionId, user.accessToken).getPersonalValues(user.quizId);
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
