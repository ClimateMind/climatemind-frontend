import React, { createContext, useState } from 'react';
import { TAuth } from '../types/Auth';

export type TAuthDispatch = React.Dispatch<React.SetStateAction<TAuth>>;

export const AuthContext = createContext<TAuth>({} as TAuth);
export const AuthDispatch = createContext<TAuthDispatch | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<TAuth>({
    authToken: null,
    user: null,
  });

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatch.Provider value={setAuth}>{children}</AuthDispatch.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
