import { useState } from 'react';
import { useToast } from '../hooks/useToast';
import { recordUserBVisitApi } from '../api/postUserBEvent';
import { useErrorLogging } from './useErrorLogging';

export function useRecordEvents() {
  const { showToast } = useToast();
  const { logError } = useErrorLogging();
  const [hasBeenCalled, setHasBeenCalled] = useState(false);

  function makeEventRecorder() {
    const recordEvent = (conversationId: string) => {
      if (!hasBeenCalled) {
        try {
          setHasBeenCalled(true);
          recordUserBVisitApi(conversationId);
          console.log('User Visit Recorded');
        } catch (err) {
          showToast({
            type: 'error',
            message: 'Unable to record user visit',
          });
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
