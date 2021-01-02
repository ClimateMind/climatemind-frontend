import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useSession } from '../hooks/useSession';
import { TPersonalityContext } from '../types/types';

import { TPersonalValues } from '../types/types';
import getPersonalValues from '../api/getPersonalValues';

const initialState: TPersonalityContext = {
  data: {} as TPersonalValues,
  isLoading: false,
  isError: false,
};

export const PersonalityContext = createContext<TPersonalityContext>(
  initialState
);

export const PersonalityContextDispatch = createContext<React.Dispatch<any>>(
  () => null
);

export const PersonalityProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({} as TPersonalValues);
  const [isLoading, setIsLoading] = useState(state.isLoading);
  const [isError, setIsError] = useState(state.isError);
  const { sessionId } = useSession();

  const fetchData = useCallback(async () => {
    try {
      if (sessionId) {
        setIsLoading(true);
        const data: any = await getPersonalValues(sessionId);
        setData(data);
        setIsLoading(false);
        if (data.error) {
          throw new Error('Personal Values failed to load');
        }
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setIsError(true);
    }
  }, [setIsLoading, setData, setIsError, sessionId]);

  // Refresh the data if the sessionId changes
  useEffect(() => {
    if (sessionId) {
      fetchData();
    }
  }, [sessionId, fetchData]);

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
      <PersonalityContextDispatch.Provider value={setState}>
        {children}
      </PersonalityContextDispatch.Provider>
    </PersonalityContext.Provider>
  );
};
