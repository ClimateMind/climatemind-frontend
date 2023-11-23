import { isMobile } from 'react-device-detect';

import { getAppSetting } from 'getAppSetting';
import { AnalyticsService } from './AnalyticsService';

const BASE_URL = getAppSetting('REACT_APP_API_URL');
if (!BASE_URL) {
  throw new Error('Missing environment variable: EXPO_PUBLIC_API_URL');
}

export const analyticsService = new AnalyticsService(BASE_URL);
if (isMobile) {
  analyticsService.setSource('webapp-mobile');
} else {
  analyticsService.setSource('webapp-desktop');
}

export * from './events';
