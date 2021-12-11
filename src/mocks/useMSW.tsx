import { setupWorker } from 'msw';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { handlers } from './handlers';

export function useMockServiceWorker() {
  const [useMSW, setUseMSW] = useLocalStorage('USE_MSW', false);
  const [useQuestions, setUseQuestions] = useLocalStorage(
    'MSW_GET_QUESTIONS',
    false
  );

  const worker = setupWorker(...handlers);

  return {
    worker,
    useMSW,
    setUseMSW,
    useQuestions,
    setUseQuestions,
  };
}
