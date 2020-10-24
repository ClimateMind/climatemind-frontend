import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
import { useSession } from '../hooks/useSession';

import { TPersonalValues } from '../types/types';
import getPersonalValues from '../api/getPersonalValues';


export const PersonalityContext = createContext<TPersonalValues>(
  {} as TPersonalValues
);

export const PersonalityProvider: React.FC = ({ children }) => {
  const [personalValues, setPersonalValues] = useState({} as TPersonalValues);
 
  const { sessionId } = useSession();

  useEffect(() => {
    if (sessionId) {
      const callPersonalValuesApi = async () => {
        const values: any = await getPersonalValues(sessionId);
        setPersonalValues(values);
      };
      callPersonalValuesApi();
    }
  }, [sessionId]);

  return (
    <PersonalityContext.Provider value={personalValues}>
      {children}
    </PersonalityContext.Provider>
  );
};

