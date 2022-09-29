import { emptyUser } from '../contexts/auth';
import { useAuth } from './auth/useAuth';
import { useAlignment } from './useAlignment';
import { postLogout } from '../api/postLogout';
import { useGetSessionId } from './useGetSessionId';
import { useSession } from './useSession';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

type UrlParamType = {
  conversationId: string;
};

function wait(interval: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export function useUserB() {
  const { setAuth } = useAuth();
  const { getNewSession } = useGetSessionId();
  const { setIsUserB } = useAlignment();
  const { setQuizId } = useSession();
  const { conversationId } = useParams<UrlParamType>();
  const [isUserBJourney, setIsUserBJourney] = useState(false);

  useEffect(() => {
    setIsUserBJourney(!!conversationId);
  }, [conversationId]);

  async function resetAppStateForUserB(conversationId: string) {
    // TODO: This is a horrible solution and we should get rid of it when we can the issue with the quiz id intersectiton is happen due to  competing aysync requests happening in different places in the app. When a new the app mount it tries to refresh the token, simultaniously this page is trying to log the user out. The refresh genrally happens before the logout causint the user to stay logged in.

    // The chaing of promises called the logout api and forces getting a new session
    // The auth context is set to an empty user
    // Set as user b and conversation id is set in alighment

    wait(50)
      .then(() => postLogout())
      .then(() => getNewSession())
      .then(() => console.log('all promises resolved'))
      .then(() => {
        if (setQuizId) {
          setQuizId('');
        }
        if (setAuth) {
          setAuth(emptyUser);
        }
        if (setIsUserB) {
          setIsUserB(true, conversationId);
        }
      });
  }

  return { resetAppStateForUserB, isUserBJourney, conversationId };
}
