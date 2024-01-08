import { useState } from 'react';
import { ClimateApi } from '../api/ClimateApi';
import { useErrorLogging } from './useErrorLogging';
import { useToastMessage } from 'shared/hooks';
import { useAppSelector } from 'store/hooks';

export function useRecordEvents() {
  const { sessionId, user } = useAppSelector(state => state.auth);
  
  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const [hasBeenCalled, setHasBeenCalled] = useState(false);

  function makeEventRecorder() {
    const recordEvent = (conversationId: string) => {
      if (!hasBeenCalled) {
        try {
          setHasBeenCalled(true);
          new ClimateApi(sessionId, user.accessToken).postUserBVisit(conversationId);
          console.log('User Visit Recorded');
        } catch (err) {
          showErrorToast('Unable to record user visit');
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
