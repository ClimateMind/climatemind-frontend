import React, { createContext, useState, useEffect } from 'react';
import { TSession } from '../types/Session';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { postSession } from '../api/postSession';

export type TSessionDispatch = React.Dispatch<React.SetStateAction<TSession>>;

export const SessionContext = createContext<TSession>({} as TSession);
export const SessionDispatch = createContext<TSessionDispatch | null>(null);

export const SessionProvider: React.FC = ({ children }) => {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useLocalStorage(
    'hasAcceptedCookies',
    false
  );

  // TODO: What are we calling quizSessionId now? We should use this as the old session id
  const [session, setSession] = useState<TSession>({
    sessionId: null,
    quizSessionId: null,
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
