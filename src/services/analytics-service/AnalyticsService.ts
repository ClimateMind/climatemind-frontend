import axios from 'axios';
import { IAnalyticsEvent } from './IAnalyticsEvent';

export class AnalyticsService {
  private sessionId: string | undefined;

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  constructor(private readonly _baseUrl: string) {}

  public postEvent(analyticsEvent: IAnalyticsEvent, value?: string) {
    if (!this.sessionId) {
      throw new Error('SessionId is undefined');
    }

    if (!(analyticsEvent.label === 'session_id') && !value) {
      throw new Error('Value is undefined');
    } else {
      value = this.sessionId;
    }

    // While the backend is not ready, we will log the events to the console
    console.log('Analytics event sent:');
    console.log(JSON.stringify({ ...analyticsEvent, value }));

    // axios.post(`${this._baseUrl}/analytics`, {
    //   ...analyticsEvent,
    //   session_id: this.sessionId,
    //   value,
    // });
  }
}
