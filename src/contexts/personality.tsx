import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
import { useSession } from '../hooks/useSession';

import { TPersonalValues } from '../types/types';
import getPersonalValues from '../api/getPersonalValues';

type TPersonalityContext = {
  data: TPersonalValues;
  isLoading: boolean;
  isError: boolean;
};

const initialState: TPersonalityContext = {
  data: {} as TPersonalValues,
  isLoading: false,
  isError: false,
};

export const PersonalityContext = createContext<TPersonalityContext>(
  initialState
);

export const PersonalityProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({} as TPersonalValues);
  const [isLoading, setIsLoading] = useState(state.isLoading);
  const [isError, setIsError] = useState(state.isError);
  const { sessionId } = useSession();

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionId) {
          setIsLoading(true);
          const data: any = await getPersonalValues(sessionId);
          setData(data);
          setIsLoading(false);
          if (!data.length) {
            throw new Error('Personal Values failed to load');
          }
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsError(true);
      }
    };
    if (sessionId && !data.personalValues && !isLoading && !isError) {
      fetchData();
    }
  }, [sessionId, data, isLoading, isError]);

  // Update the state
  useEffect(() => {
    const newState = {
      data,
      isLoading,
      isError,
    };
    setState(newState);
  }, [setState, data, isLoading, isError]);

  return (
    <PersonalityContext.Provider value={state}>
      {children}
    </PersonalityContext.Provider>
  );
};
