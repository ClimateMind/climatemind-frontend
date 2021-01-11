import React, { createContext, useState } from 'react';

interface SessionContextProps {
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  zipCode: string;
  setZipCode: (zipCode: string) => void;
}

export const SessionContext = createContext<SessionContextProps>({
  sessionId: '',
  setSessionId: () => {
    throw Error('SessionId.setSessionId() has not been initialised');
  },
  zipCode: '',
  setZipCode: () => {
    throw Error('SessionId.setZipCode() has not been initialised');
  },
});

export const SessionProvider: React.FC = ({ children }) => {
  const [sId, setSId] = useState<string>(
    sessionStorage.getItem('sessionId') || '',
  );
  const [zCode, setZCode] = useState<string>('');

  const handleSetSID = (sessionId: string) => {
    sessionStorage.setItem(
      'sessionId',
      sessionId,
    );
    setSId(sessionId);
  };

  const handleSetZCode = (zipCode: string) => {
    setZCode(zipCode);
  };

  return (
    <SessionContext.Provider value={{sessionId: sId, setSessionId: handleSetSID, zipCode: zCode, setZipCode: handleSetZCode}}>
        {children}
    </SessionContext.Provider>
  );
};
