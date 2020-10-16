import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from '../hooks/useSession';

import { TPersonalValues } from '../types/types';

export const PersonalityContext = createContext<TPersonalValues>(
  {} as TPersonalValues
);

export const PersonalityProvider: React.FC = ({ children }) => {
  const [personalValues, setPersonalValues] = useState({} as TPersonalValues);
  const API_HOST =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;

  const { sessionId } = useSession();
  const PERSONAL_VALUES_ENDPOINT = `/personal_values?session-id=${sessionId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(API_HOST + PERSONAL_VALUES_ENDPOINT);
        const data = request.data;
        setPersonalValues(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (sessionId) {
      fetchData();
    }
  }, [API_HOST, PERSONAL_VALUES_ENDPOINT, sessionId]);

  return (
    <PersonalityContext.Provider value={personalValues}>
      {children}
    </PersonalityContext.Provider>
  );
};
