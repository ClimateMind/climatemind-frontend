import { useApiClient } from 'shared/hooks';

function useSendFeedback() {
  const apiClient = useApiClient();

  function sendFeedback(feedback: string) {
    return apiClient.postFeedback(feedback);
  }

  return sendFeedback;
}

export default useSendFeedback;
