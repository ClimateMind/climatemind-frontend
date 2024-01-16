import { useEffect, useState } from 'react';

import { GetPersonalValues } from 'api/responses';
import { useApiClient } from 'shared/hooks';

function useGetPersonalValues(quizId: string) {
  const apiClient = useApiClient();

  const [data, setData] = useState<GetPersonalValues>();

  useEffect(() => {
    if (quizId) {
      apiClient.getPersonalValues(quizId).then((res) => {
        setData(res);
      })
    }
  }, [quizId])

  return {
    personalValues: data,
  };
}

export default useGetPersonalValues;
