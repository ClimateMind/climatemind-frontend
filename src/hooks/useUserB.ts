import { useEffect, useState } from 'react';
import { useAlignment } from './useAlignment';
import { useParams } from 'react-router';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'features/auth';
import { useApiClient } from 'shared/hooks';
import ROUTES from 'router/RouteConfig';
import { useNavigate } from 'react-router-dom';

type UrlParamType = {
  conversationId: string;
};

function wait(interval: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export function useUserB() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { setIsUserB } = useAlignment();
  const { conversationId } = useParams<UrlParamType>();
  const [isUserBJourney, setIsUserBJourney] = useState(false);

  useEffect(() => {
    setIsUserBJourney(!!conversationId);
  }, [conversationId]);

  async function resetAppStateForUserB(conversationId: string) {
    const apiClient = useApiClient();
    
    // TODO: This is a horrible solution and we should get rid of it when we can the issue with the quiz id intersectiton is happen due to  competing aysync requests happening in different places in the app. When a new the app mount it tries to refresh the token, simultaniously this page is trying to log the user out. The refresh genrally happens before the logout causint the user to stay logged in.

    // The chaing of promises called the logout api and forces getting a new session
    // The auth context is set to an empty user
    // Set as user b and conversation id is set in alighment

    wait(50)
      .then(() => apiClient.postLogout())
      .then(() => {
        
        // if (setAuth) {
        //   setAuth(emptyUser);
        // }
        if (setIsUserB) {
          setIsUserB(true, conversationId);
        }
      });

      dispatch(logout());
      navigate(ROUTES.HOME_PAGE);
  }

  return { resetAppStateForUserB, isUserBJourney, conversationId };
}
