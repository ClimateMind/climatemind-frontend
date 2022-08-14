import { useToast } from '../hooks/useToast';
import { recordUserBVisitApi } from '../api/postUserBEvent';
import { useErrorLogging } from './useErrorLogging';

export function useRecordEvents() {
  const { showToast } = useToast();
  const { logError } = useErrorLogging();

  function makeEventRecorder() {
    let hasBeenCalled = false;

    const recordEvent = (conversationId: string) => {
      if (!hasBeenCalled) {
        try {
          hasBeenCalled = true;
          recordUserBVisitApi(conversationId);
          console.log('User Visit Recorded');
        } catch (err) {
          showToast({
            type: 'error',
            message: 'Unable to record user visit',
          });
          logError(err);
        }
      } else {
        console.log('Cant call function twice');
      }
    };

    return recordEvent;
  }

  const recordUserBVisit = makeEventRecorder();

  return {
    recordUserBVisit,
  };
}
