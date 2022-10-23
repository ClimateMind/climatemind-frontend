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

  const [quizIdFromStorage] = useLocalStorage('quizId', '');
  const { sessionId } = useGetSessionId();

  const [session, setSession] = useState<TSession>({
    sessionId: null,
    quizId: quizIdFromStorage,
    zipCode: null,
    sessionState: 'new',
    hasAcceptedCookies,
    setHasAcceptedCookies,
  });

  // Set the session id each time it changes
  useEffect(() => {
    setSession((prevState) => ({
      ...prevState,
      sessionId,
    }));
  }, [sessionId]);

  // Updated state when localStorage is updated for hasAcceptedCookies or quizId
  useEffect(() => {
    setSession((prevState) => ({
      ...prevState,
      hasAcceptedCookies,
      quizId: quizIdFromStorage,
    }));
  }, [hasAcceptedCookies, quizIdFromStorage]);

  return (
    <SessionContext.Provider value={session}>
      <SessionDispatch.Provider value={setSession}>
        {children}
      </SessionDispatch.Provider>
    </SessionContext.Provider>
  );
};
