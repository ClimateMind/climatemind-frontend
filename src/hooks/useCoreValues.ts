import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import getPersonalValues from '../api/getPersonalValues';
import { TPersonalValues } from '../types/PersonalValues';
import { useSession } from './useSession';

export const useCoreValues = () => {
  // const { showToast } = useToast();
  const location = useLocation();
  var { quizId } = useSession();
  if (location.state) {
    const state = location.state as { "quizId": string }
    quizId = state.quizId;
  }
  
  console.log(JSON.stringify(location));
  const [values, setValues] = useState({} as TPersonalValues);
  
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
