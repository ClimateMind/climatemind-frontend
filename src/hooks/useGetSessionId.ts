import { useEffect, useState } from 'react';
import { ClimateApi } from '../api/ClimateApi';
// import { useAuth } from './auth/useAuth';
import { useErrorLogging } from './useErrorLogging';
import { useSession } from './useSession';
import { useToast } from './useToast';

export function useGetSessionId() {

  const { showToast } = useToast();
  const [sessionId, setSessionId] = useState<string>('');
  const { sessionState, setSessionState } = useSession();
  // const { accessToken } = useAuth();
  const { logError } = useErrorLogging();

  const getNewSessionId = () => {
    if (sessionStorage.getItem('sessionId')) {
      setSessionId(sessionStorage.getItem('sessionId')!);
      setSessionState('active');
    } else {
      if (sessionState !== 'new') {
        setSessionState('loading');
        new ClimateApi(sessionId, '').postSession()
          .then(res => {
            setSessionId(res.sessionId)
            setSessionState('active');
            sessionStorage.setItem('sessionId', res.sessionId);
          })
          .catch(err => {
            showToast({
              type: 'error',
              message:
                'Something went wrong intializing your session. :( Please refresh the page to try again.',
            });
            logError(err);
          })
      }
    }
  }

  useEffect(() => {
    getNewSessionId();
    // eslint-disable-next-line
  }, []);

  return { sessionId, getNewSessionId };
}
