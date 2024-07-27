import * as Sentry from '@sentry/react';

export function logErrorToSentry(errToLog: unknown) {
  import.meta.env.ENV === 'development' && alert(errToLog);
  import.meta.env.ENV === 'production' && Sentry.captureException(errToLog);
}

export function logMessageToSentry(message: string) {
  import.meta.env.ENV === 'development' && alert(message);
  import.meta.env.ENV === 'production' && Sentry.captureMessage(message);
}
