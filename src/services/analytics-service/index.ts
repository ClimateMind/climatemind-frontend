import { getAppSetting } from 'getAppSetting';
import { AnalyticsService } from './AnalyticsService';

const BASE_URL = getAppSetting('REACT_APP_API_URL');
if (!BASE_URL) {
  throw new Error('Missing environment variable: EXPO_PUBLIC_API_URL');
}

export const analyticsService = new AnalyticsService(BASE_URL);
export * from './events';
