import { useEffect, useState } from 'react';
import { ClimateApi } from '../api/ClimateApi';
import { useErrorLogging } from './useErrorLogging';
import { useSession } from './useSession';
import { useToastMessage } from 'shared/hooks';

export function useGetSessionId() {
  const { showErrorToast } = useToastMessage();
  const [sessionId, setSessionId] = useState<string>('');
  const { sessionState, setSessionState } = useSession();
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
            showErrorToast('Something went wrong intializing your session. :( Please refresh the page to try again.');

            logError(err);
          })
      }
    }
  }

  useEffect(() => {
    getNewSessionId();
  }, []);

  return { sessionId, getNewSessionId };
}
