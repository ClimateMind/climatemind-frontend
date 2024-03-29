import { isMobile } from 'react-device-detect';
import { AnalyticsService } from './AnalyticsService';

const BASE_URL = process.env.REACT_APP_API_URL;
if (!BASE_URL) {
  throw new Error('Missing environment variable: EXPO_PUBLIC_API_URL');
}

export const analyticsService = new AnalyticsService(BASE_URL);
if (isMobile) {
  analyticsService.setPlatform('webapp-mobile');
} else {
  analyticsService.setPlatform('webapp-desktop');
}

export * from './events';
