import axios from 'axios';
import { IAnalyticsEvent } from './IAnalyticsEvent';

type TPlatform = 'webapp-desktop' | 'webapp-mobile' | 'mobile-android' | 'mobile-ios';

/**
 * To use this service, you need to create an instance of it and set the sessionId and platform.
 * When using the service in a native app, you also need to set the screenName, whenever it changes.
 * Then you can call the postEvent method with one of the predefined events and its corresponding value.
 */
export class AnalyticsService {
  private _sessionId: string | undefined;
  private _platform: TPlatform | undefined;
  private _screenName: string | undefined;

  constructor(private readonly _baseUrl: string) {}

  setSessionId(sessionId: string) {
    this._sessionId = sessionId;
  }

  setPlatform(platform: TPlatform) {
    this._platform = platform;
  }

  setScreenName(screenName: string) {
    if (this._platform !== 'mobile-android' && this._platform !== 'mobile-ios') {
      throw new Error('Screen name is only applicable for native apps (mobile-android or mobile-ios)');
    }

    this._screenName = screenName;
  }

  public postEvent(analyticsEvent: IAnalyticsEvent, eventValue?: string) {
    // Verify that the sessionId is defined
    if (!this._sessionId) {
      throw new Error('SessionId is undefined');
    }

    // Verify that the eventValue is defined for all events except if the value should be the sessionId
    if (analyticsEvent.label === 'session_id') {
      eventValue = this._sessionId;
    } else if (!eventValue) {
      throw new Error('Value is undefined');
    }

    // Create timestamp with required format: %Y-%m-%d %H:%M:%S (eg: 2020-11-18 07:07:19)
    const eventTimestamp = new Date().toISOString().replace('T', ' ').slice(0, -5);

    // Set the pageUrl to the current url (webapp) or current screenName (native app)
    let pageUrl = '';
    if (this._platform === 'webapp-desktop' || this._platform === 'webapp-mobile') {
      pageUrl = window.location.href;
    } else if (this._platform === 'mobile-android' || this._platform === 'mobile-ios') {
      pageUrl = this._screenName || '';
    }

    axios.post(
      `${this._baseUrl}/analytics`,
      {
        ...analyticsEvent,
        eventValue,
        eventTimestamp,
        pageUrl,
      },
      {
        headers: {
          'X-Session-Id': this._sessionId,
        },
      }
    );
  }
}
