import { useApiClient } from "shared/hooks";

function useRecordUserBVisit() {
  const apiClient = useApiClient();

  function recordUserBVisit(conversationId: string) {
    apiClient.postUserBVisit(conversationId);
  }

  return { recordUserBVisit };
}

export default useRecordUserBVisit;
