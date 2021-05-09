import { useContext } from 'react';
import { TAuth } from '../types/Auth';
import { AuthContext } from '../contexts/auth';
import { AuthDispatch } from '../contexts/auth';

export function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);

  const setUser = (user: TAuth) => {
    if (setAuth) {
      setAuth(user);
    }
  };

  const logout = () => {
    // TODO: Implement log OUT function
  };

  const login = () => {
    // TODO: Implement log IN function
  };

  return {
    auth,
    setUser,
    login,
    logout,
  };
}
