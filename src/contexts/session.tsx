import React, { createContext, useState } from 'react';
import { TSession } from '../types/Session';

export type TSessionDispatch = React.Dispatch<React.SetStateAction<TSession>>;

export const SessionContext = createContext<TSession>({} as TSession);
export const SessionDispatch = createContext<TSessionDispatch | null>(null);

export const SessionProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<TSession>({
    sessionId: null,
    zipCode: null,
    hasAcceptedPrivacyPolicy: false,
  });

  return (
    <SessionContext.Provider value={session}>
      <SessionDispatch.Provider value={setSession}>
        {children}
      </SessionDispatch.Provider>
    </SessionContext.Provider>
  );
};
