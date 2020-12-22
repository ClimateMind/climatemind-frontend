import { useEffect, useState } from 'react';
import { getMyths } from '../api/getMyths';

export const useMyths = () => {
  const [myths, setMyths] = useState({} as any);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyths();
      if (myths) {
        setMyths(response);
      }
    };
    getData();
  }, [setMyths]);

  console.log(myths);
};
