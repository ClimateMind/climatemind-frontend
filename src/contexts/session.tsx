import React, { createContext, useState, useEffect } from 'react';
import { TSession } from '../types/Session';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type TSessionDispatch = React.Dispatch<React.SetStateAction<TSession>>;

export const SessionContext = createContext<TSession>({} as TSession);
export const SessionDispatch = createContext<TSessionDispatch | null>(null);

export const SessionProvider: React.FC = ({ children }) => {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useLocalStorage(
    'hasAcceptedCookies',
    false
  );

  const [session, setSession] = useState<TSession>({
    sessionId: null,
    zipCode: null,
    hasAcceptedCookies,
    setHasAcceptedCookies,
  });

  // useEffect(() => {
  //   const handleSession = (sessionId: string) => {
  //     if (sessionId) {
  //       sessionStorage.getItem('sessionId');
  //     }
  //     sessionStorage.setItem('sessionId', sessionId);
  //     setSession({
  //       ...session,
  //       sessionId: sessionId,
  //     });
  //     handleSession(sessionId);
  //   };
  // }, []);

  // Updated stats when localSotrage is updated for hasAcceptedCookies
  useEffect(() => {
    setSession((prevState) => ({
      ...prevState,
      hasAcceptedCookies,
    }));
  }, [hasAcceptedCookies]);

  return (
    <SessionContext.Provider value={session}>
      <SessionDispatch.Provider value={setSession}>
        {children}
      </SessionDispatch.Provider>
    </SessionContext.Provider>
  );
};
