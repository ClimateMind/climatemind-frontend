import { createRoot } from 'react-dom/client';
import App from './App';

// import { getAppSetting } from './getAppSetting';
// import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';

// const sentryDsn = getAppSetting('REACT_APP_SENTRY_DSN');
// const [, origin] = window.location.origin.split('://');

// Sentry.init({
//   dsn: sentryDsn,
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
//   environment: origin,
//   release: '%REACT_APP_RELEASE_VERSION%',
// });

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
