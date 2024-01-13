import * as Sentry from '@sentry/react';

export function logErrorToSentry(errToLog: unknown) {
  import.meta.env.DEV && alert(errToLog);
  import.meta.env.PROD && Sentry.captureException(errToLog);
}

export function logMessageToSentry(message: string) {
  import.meta.env.DEV && alert(message);
  import.meta.env.PROD && Sentry.captureMessage(message);
}
