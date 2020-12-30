import React, { createContext, useState } from 'react';

interface SessionContextProps {
  sessionId: string;
  setSessionId: (sessionId: string) => void;
}

export const SessionContext = createContext<SessionContextProps>({
  sessionId: '',
  setSessionId: () => {
    throw Error('SessionId.setSessionId() has not been initialised');
  },
});

export const SessionProvider: React.FC = ({ children }) => {
  const [sId, setSId] = useState<string>(
    sessionStorage.getItem('sessionId') || '',
  );

  const handleSetSID = (sessionId: string) => {
    sessionStorage.setItem(
      'sessionId',
      sessionId,
    );
    setSId(sessionId);
  };

  return (
    <SessionContext.Provider value={{sessionId: sId, setSessionId: handleSetSID}}>
        {children}
    </SessionContext.Provider>
  );
};
