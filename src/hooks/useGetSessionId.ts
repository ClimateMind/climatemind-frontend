import { useEffect, useCallback, useState } from 'react';
import { useSessionStorage } from './useSessionStorage';
import { postSession } from '../api/postSession';

export function useGetSessionId() {
  const { data, storeValue } = useSessionStorage('', 'sessionId');
  const [hasFetchedSessionId, setHasFetchedSessionId] = useState(false);

  const getSessionId = useCallback(async () => {
    try {
      const data = await postSession();
      const newSessionId = data.sessionId;
      storeValue(newSessionId);
    } catch (err) {
      console.error(err);
    }
  }, [storeValue]);

  useEffect(() => {
    if (data === '' && !hasFetchedSessionId) {
      getSessionId();
      setHasFetchedSessionId(true);
    }
  }, [data, getSessionId, hasFetchedSessionId]);

  return data;
}
