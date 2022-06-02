import React, { createContext, useEffect, useState } from 'react';
import { useGetSessionId } from '../hooks/useGetSessionId';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TSession } from '../types/Session';

export type TSessionDispatch = React.Dispatch<
  React.SetStateAction<TSession>
>;

export const SessionContext = createContext<TSession>({} as TSession);
export const SessionDispatch = createContext<TSessionDispatch | null>(
  null
);

type Props = {
  children?: React.ReactNode;
};

export const SessionProvider: React.FC<Props> = ({ children }) => {
  // Save cookie accepted status to localStorage.
  const [hasAcceptedCookies, setHasAcceptedCookies] = useLocalStorage(
    'hasAcceptedCookies',
    false
  );

  const [quizIdFromStorage] = useLocalStorage('quizId', '');

  // gets a unique session id on load for the session and stores in session storage
  const fetchedSessionId = useGetSessionId();

  const [session, setSession] = useState<TSession>({
    sessionId: null,
    quizId: quizIdFromStorage,
    // alignmentScoresId: alignmentScoresIdFromStorage,
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

  // We need to get the quizId from sessionStorage, if any is set, in case the user refreshes the browser
  useEffect(() => {
    setSession((prevState) => ({
      ...prevState,
      quizId: quizIdFromStorage,
    }));
  }, [quizIdFromStorage]);

  useEffect(() => {
    setSession((prevState) => ({
      ...prevState,
      sessionId: fetchedSessionId ? fetchedSessionId : null,
    }));
    // Added the session.sessionId to the dep array as it is being updated to null elsewhere.
  }, [fetchedSessionId, session.sessionId]);

  return (
    <SessionContext.Provider value={session}>
      <SessionDispatch.Provider value={setSession}>
        {children}
      </SessionDispatch.Provider>
    </SessionContext.Provider>
  );
};
