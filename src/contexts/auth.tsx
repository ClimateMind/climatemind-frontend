import React, { createContext, useState, useEffect } from 'react';
import { TAuth } from '../types/Auth';
import { refreshResponse } from '../api/postRefresh';
import { useRefresh } from '../hooks/auth/useRefresh';
import { useSession } from '../hooks/useSession';
import { climateApi } from '../api/apiHelper';

export type TAuthDispatch = React.Dispatch<React.SetStateAction<TAuth>>;

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
  isLoading: true,
};

const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<TAuth>(emptyUser);
  const { fetchRefreshToken } = useRefresh();
  const { setQuizId } = useSession();

  const makeUserObejectFromResonse = (response: refreshResponse) => ({
    firstName: response.user.first_name,
    lastName: response.user.last_name,
    email: response.user.email,
    userIntials: response.user.first_name[0] + response.user.last_name[0],
    accessToken: response.access_token,
    userId: response.user.user_uuid,
    isLoggedIn: true,
    quizId: response.user.quiz_id,
    isLoading: false,
  });

  function setUserFromResponse(response: refreshResponse) {
    const userObject = makeUserObejectFromResonse(response);
    setAuth(userObject);
    setQuizId(response.user.quiz_id);
  }

  async function silentlyFetchRefreshToken() {
    if (!auth.isLoggedIn && !auth.accessToken) {
      // See if we can refresh the token token
      try {
        const response = await fetchRefreshToken();
        setUserFromResponse(response);
      } catch (err) {
        setAuth({ ...auth, isLoading: false });
        console.error(err);
      }
    }
  }

  useEffect(() => {
    // Call refresh on load on load to see if the user has a valid refresh token
    !auth.isLoggedIn && silentlyFetchRefreshToken();

    // Refresh token before it expires
    const timer = setInterval(async function refetchTokenOnInterval() {
      const response = await fetchRefreshToken();
      setUserFromResponse(response);
    }, 870000); // 14mins 30seconds 870000

    // Clear token refresh time on unmount
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Add access token to all requests
    if (auth.accessToken) {
      climateApi.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        return config;
      });
    }
  }, [auth.accessToken]);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatch.Provider value={setAuth}>{children}</AuthDispatch.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
