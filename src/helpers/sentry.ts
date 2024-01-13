import * as Sentry from '@sentry/react';

export function logErrorToSentry(errToLog: unknown) {
  process.env.NODE_ENV === 'development' && alert(errToLog);
  process.env.NODE_ENV === 'production' && Sentry.captureException(errToLog);
}

export function logMessageToSentry(message: string) {
  process.env.NODE_ENV === 'development' && alert(message);
  process.env.NODE_ENV === 'production' && Sentry.captureMessage(message);
}
