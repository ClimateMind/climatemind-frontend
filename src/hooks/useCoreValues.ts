import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { TPersonalValues } from '../types/PersonalValues';
import { useSession } from './useSession';
import { useAppSelector } from 'store/hooks';

export const useCoreValues = () => {
  const [values, setValues] = useState({} as TPersonalValues);
  const { quizId, sessionId } = useSession();
  const { accessToken } = useAppSelector(state => state.auth.user);

  // Get the data
  const { data, isLoading, isError } = useQuery(['values', quizId], () => {
    if (quizId) {
      return new ClimateApi(sessionId, accessToken).getPersonalValues(quizId);
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
