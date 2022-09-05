import React, { useContext } from 'react';
import { emptyUser } from '../contexts/auth';
import { useAuth } from './auth/useAuth';
import { useSession } from './useSession';
import { postLogout } from '../api/postLogout';
import { climateApi } from '../api/apiHelper';
import { useLocalStorage } from './useLocalStorage';
import { useGetSessionId } from './useGetSessionId';

function wait(interval: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export function useUserB() {
  const { setAuth } = useAuth();
  const { clearSessionId } = useSession();
  const sessionId = useGetSessionId();

  async function resetAppStateForUserB(conversationId: string) {
    // TODO: This is a horrible solution and we should get rid of it when we can the issue with the quiz id intersectiton is happen due to competing competing aysync request happening in different places in the app. When a new the app mount it tries to refresh the token, simultaniously this page is trying to log the user out. The refresh genrally happens before the logout causint the user to stay logged in.

    wait(50)
      .then(() => postLogout())
      .then(() => {
        if (setAuth) {
          setAuth(emptyUser);
          clearSessionId();
        }
      });
  }

  return { resetAppStateForUserB };
}
