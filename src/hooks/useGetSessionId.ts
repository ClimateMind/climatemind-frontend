import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { postSession } from '../api/postSession';
import { useSession } from './useSession';
import { useSessionStorage } from './useSessionStorage';
import { useToast } from './useToast';

export function useGetSessionId() {
  const [storedSession, storeValue] = useSessionStorage(
    '' as string,
    'sessionId'
  );

  const { showToast } = useToast();
  const { setSessionState } = useSession();

  const { mutateAsync } = useMutation(() => postSession(), {
    onSuccess: (data) => {
      storeValue(data.sessionId);
      setSessionState('active');
    },
    onError: () => {
      showToast({
        type: 'error',
        message:
          'Something went wrong intializing your session. :( Please refresh the page to try again.',
      });
    },
  });

  useEffect(() => {
    if (!storedSession) {
      setSessionState('loading');
      mutateAsync();
    }
  }, [setSessionState, storedSession, mutateAsync]);

  return { sessionId: storedSession, getNewSession: mutateAsync };
}
