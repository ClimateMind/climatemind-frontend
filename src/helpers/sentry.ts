import * as Sentry from '@sentry/react';

export function logErrorToSentry(errToLog: unknown) {
  import.meta.env.NODE_ENV === 'development' && alert(errToLog);
  import.meta.env.NODE_ENV === 'production' && Sentry.captureException(errToLog);
}

export function logMessageToSentry(message: string) {
  import.meta.env.NODE_ENV === 'development' && alert(message);
  import.meta.env.NODE_ENV === 'production' && Sentry.captureMessage(message);
}
