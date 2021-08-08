import React, { createContext, useState, useEffect } from 'react';
import { TSession } from '../types/Session';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useGetSessionId } from '../hooks/useGetSessionId';

export type TSessionDispatch = React.Dispatch<React.SetStateAction<TSession>>;

export const SessionContext = createContext<TSession>({} as TSession);
export const SessionDispatch = createContext<TSessionDispatch | null>(null);

export const SessionProvider: React.FC = ({ children }) => {
  // Save cookie accepted status to localStorage.
  const [hasAcceptedCookies, setHasAcceptedCookies] = useLocalStorage(
    'hasAcceptedCookies',
    false
  );

  // gets a unique session id on load for the session and stores in session storage
  const fetchedSessionId = useGetSessionId();

  const [session, setSession] = useState<TSession>({
    sessionId: null,
    quizId: null,
    zipCode: null,
    hasAcceptedCookies,
    setHasAcceptedCookies,
  });

  // Updated state when localStorage is updated for hasAcceptedCookies
  useEffect(() => {
    setSession((prevState) => ({
      ...prevState,
      hasAcceptedCookies,
    }));
  }, [hasAcceptedCookies]);

  useEffect(() => {
    setSession((prevState) => {
      console.log('fetched', { fetchedSessionId });
      return {
        ...prevState,
        sessionId: fetchedSessionId ? fetchedSessionId : null,
      };
    });
  }, [fetchedSessionId]);

  return (
    <SessionContext.Provider value={session}>
      <SessionDispatch.Provider value={setSession}>
        {children}
      </SessionDispatch.Provider>
    </SessionContext.Provider>
  );
};
