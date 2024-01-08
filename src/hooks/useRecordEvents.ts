import { useState } from 'react';
import { useErrorLogging } from './useErrorLogging';
import { useApiClient, useToastMessage } from 'shared/hooks';

export function useRecordEvents() {
  const apiClient = useApiClient();
  
  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const [hasBeenCalled, setHasBeenCalled] = useState(false);

  function makeEventRecorder() {
    const recordEvent = (conversationId: string) => {
      if (!hasBeenCalled) {
        try {
          setHasBeenCalled(true);
          apiClient.postUserBVisit(conversationId);
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
