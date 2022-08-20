import { logErrorToSentry, logMessageToSentry } from '../helpers/sentry';

export function useErrorLogging() {
  const logError = (err: unknown) => {
    logErrorToSentry(err);
  };

  const logMessage = (message: string) => {
    logMessageToSentry(message);
  };

  return {
    logError,
    logMessage,
  };
}
