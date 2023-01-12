import { logErrorToSentry, logMessageToSentry } from '../helpers/sentry';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
