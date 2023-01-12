import * as Sentry from '@sentry/react';

export function logErrorToSentry(errToLog: unknown): void {
  try {
    console.error(errToLog);
    Sentry.captureException(errToLog);
  } catch (err) {
    console.error('Failed to log to sentry: ', errToLog);
    console.error(err);
  }
}

export function logMessageToSentry(message: string): void {
  try {
    console.error(message);
    Sentry.captureMessage(message);
  } catch (err) {
    console.error('Failed to log message: ', message);
    console.error(err);
  }
}
