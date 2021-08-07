import { useEffect, useCallback } from 'react';
import { useSessionStorage } from './useSessionStorage';
import { postSession } from '../api/postSession';

export function useGetSessionId() {
  const { data, storeValue } = useSessionStorage('', 'sessionId');

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
    data === '' && getSessionId();
  }, [data, getSessionId]);

  return data;
}
