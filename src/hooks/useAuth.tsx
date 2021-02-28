import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { AuthDispatch } from '../contexts/auth';

export function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);

  // TODO: Add Register method
  const login = () => {
    console.log('FAKE logging in');
    if (setAuth) {
      setAuth((prevValue) => ({
        ...prevValue,
        isLoggedIn: true,
      }));
    }
  };

  // TODO: Add login method
  const register = () => {
    console.log('FAKE register');
  };

  const isLoggedIn = auth?.isLoggedIn;

  return {
    login,
    register,
    isLoggedIn,
    auth,
  };
}
