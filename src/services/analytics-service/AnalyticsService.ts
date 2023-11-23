import axios from 'axios';
import { IAnalyticsEvent } from './IAnalyticsEvent';

type TAnalyticsEventSource = 'webapp-desktop' | 'webapp-mobile' | 'mobile-android' | 'mobile-ios';

export class AnalyticsService {
  private _source: TAnalyticsEventSource | undefined;
  private _sessionId: string | undefined;

  setSource(source: TAnalyticsEventSource) {
    this._source = source;
  }

  setSessionId(sessionId: string) {
    this._sessionId = sessionId;
  }

  constructor(private readonly _baseUrl: string) {}

  public postEvent(analyticsEvent: IAnalyticsEvent, eventValue?: string) {
    if (!this._sessionId) {
      throw new Error('SessionId is undefined');
    }

    if (!(analyticsEvent.label === 'session_id') && !eventValue) {
      throw new Error('Value is undefined');
    } else {
      eventValue = this._sessionId;
    }

    // Required format: %Y-%m-%d %H:%M:%S (eg: 2020-11-18 07:07:19)
    const eventTimestamp = new Date().toISOString().replace('T', ' ').slice(0, -5);

    // While the backend is not ready, we will log the events to the console
    console.log('Analytics event sent:');
    console.log(JSON.stringify({ ...analyticsEvent, eventValue, eventTimestamp }));

    // axios.post(
    //   `${this._baseUrl}/analytics`,
    //   {
    //     ...analyticsEvent,
    //     category: analyticsEvent.category + ' - ' + this.source,
    //     eventValue,
    //     eventTimestamp,
    //     pageUrl: window.location.href,
    //   },
    //   {
    //     headers: {
    //       'X-Session-Id': this.sessionId,
    //     },
    //   }
    // );
  }
}
