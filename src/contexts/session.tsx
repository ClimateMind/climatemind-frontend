import { createContext, useState, useEffect } from 'react';
import { TSession } from '../types/Session';
import { useGetSessionId } from '../hooks/useGetSessionId';
import { analyticsService } from 'services';

export type TSessionDispatch = React.Dispatch<React.SetStateAction<TSession>>;

export const SessionContext = createContext<TSession>({} as TSession);
export const SessionDispatch = createContext<TSessionDispatch | null>(null);

interface Props {
  children: React.ReactNode;
}

export function SessionProvider({ children }: Props) {
  // Save cookie accepted status to localStorage.
  const hasAcceptedCookies = (/true/i).test(localStorage.getItem('hasAcceptedCookies') ?? '');

  const quizIdFromStorage = localStorage.getItem('quizId') ?? '';
  const { sessionId } = useGetSessionId();

  const [session, setSession] = useState<TSession>({
    sessionId: null,
    quizId: quizIdFromStorage,
    zipCode: null,
    sessionState: 'new',
    hasAcceptedCookies,
    setHasAcceptedCookies: () => localStorage.setItem('hasAcceptedCookies', 'true'),
  });

  // Set the session id each time it changes
  useEffect(() => {
    setSession((prevState) => ({
      ...prevState,
      sessionId,
    }));
  }, [sessionId]);

  // Update the sessionId for the analytics service when it changes
  useEffect(() => {
    analyticsService.setSessionId(sessionId);
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
}
