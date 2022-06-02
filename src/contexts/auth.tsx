import React, { createContext, useState } from 'react';
import { TAuth } from '../types/Auth';

export type TAuthDispatch = React.Dispatch<
  React.SetStateAction<TAuth>
>;

export const AuthContext = createContext<TAuth>({} as TAuth);
export const AuthDispatch = createContext<TAuthDispatch | null>(null);

export const emptyUser: TAuth = {
  firstName: '',
  lastName: '',
  userIntials: '',
  accessToken: '',
  email: '',
  userId: '',
  isLoggedIn: false,
  quizId: null,
};

type Props = {
  children?: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<TAuth>(emptyUser);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatch.Provider value={setAuth}>
        {children}
      </AuthDispatch.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
