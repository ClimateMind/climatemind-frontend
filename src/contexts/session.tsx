import React, { createContext, useState, useEffect } from 'react';
import { TSession } from '../types/Session';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { postSession } from '../api/postSession';

export type TSessionDispatch = React.Dispatch<React.SetStateAction<TSession>>;

export const SessionContext = createContext<TSession>({} as TSession);
export const SessionDispatch = createContext<TSessionDispatch | null>(null);

export const SessionProvider: React.FC = ({ children }) => {
  // Save cookie accepted status to localStorage.
  const [hasAcceptedCookies, setHasAcceptedCookies] = useLocalStorage(
    'hasAcceptedCookies',
    false
  );

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

  // Set session id on load
  useEffect(() => {
    async function getSessionId() {
      try {
        const data = await postSession();
        const newSessionId = data.sessionId;
        setSession((prevSession) => ({
          ...prevSession,
          sessionId: newSessionId,
        }));
      } catch (err) {
        console.error(err);
      }
    }

    getSessionId();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <SessionDispatch.Provider value={setSession}>
        {children}
      </SessionDispatch.Provider>
    </SessionContext.Provider>
  );
};
