import React, { createContext, useState } from 'react';

export type TSessionProvider = string | null;

export type TSessionDispatch = React.Dispatch<
  React.SetStateAction<string | null>
>;

export const SessionContext = createContext<TSessionProvider | null>(null);
export const SessionDispatch = createContext<TSessionDispatch | null>(null);

export const SessionProvider: React.FC = ({ children }) => {
  const [sessionId, setSessionId] = useState<string | null>(
    'e9717610-31c7-4365-970d-ba910f101bda'
  );

  return (
    <SessionContext.Provider value={sessionId}>
      <SessionDispatch.Provider value={setSessionId}>
        {children}
      </SessionDispatch.Provider>
    </SessionContext.Provider>
  );
};
