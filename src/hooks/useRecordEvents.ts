import { useState } from 'react';
import { ClimateApi } from '../api/ClimateApi';
// import { useToast } from '../hooks/useToast';
import { useAuth } from './auth/useAuth';
import { useErrorLogging } from './useErrorLogging';
import { useSession } from './useSession';

export function useRecordEvents() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();
  
  // const { showToast } = useToast();
  const { logError } = useErrorLogging();
  const [hasBeenCalled, setHasBeenCalled] = useState(false);

  function makeEventRecorder() {
    const recordEvent = (conversationId: string) => {
      if (!hasBeenCalled) {
        try {
          setHasBeenCalled(true);
          new ClimateApi(sessionId, accessToken).postUserBVisit(conversationId);
          console.log('User Visit Recorded');
        } catch (err) {
          // showToast({
          //   type: 'error',
          //   message: 'Unable to record user visit',
          // });
          logError(err);
        }
      }
    };

    return recordEvent;
  }

  const recordUserBVisit = makeEventRecorder();

  return {
    recordUserBVisit,
  };
}
