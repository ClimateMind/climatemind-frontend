import React, { createContext, useState, useEffect } from 'react';

import { TClimateFeed } from '../types/types';
import { useSession } from '../hooks/useSession';
import getFeed from '../api/getFeed';

export const FeedContext = createContext<TClimateFeed>({} as TClimateFeed);

export const ClimateFeedProvider: React.FC = ({ children }) => {
  const [climatefeed, setClimateFeed] = useState({} as TClimateFeed);

  const { sessionId } = useSession();

  useEffect(() => {
    if (sessionId) {
      const callFeedApi = async () => {
        const feed: any = await getFeed(sessionId);
        setClimateFeed(feed);
      };
      callFeedApi();
    }
  }, [sessionId]);

  const mockfeed = [{
    actionHeadline: "Reducing Food Waste",
    effectDescription: 'No short desc available at present. Uses Mock Data',
    effectId: 'R8t0oNsG3WgnupXsBVSjMHZ',
    effectScore: 14,
    effectTitle: 'increase in suicide',
    imageUrl:
      'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
  },
  {
    actionHeadline: "Reducing Food Waste",
    effectDescription: 'No short desc available at present. Uses Mock Data',
    effectId: 'R8epBa4UvcieLTynfK3E84u',
    effectScore: 14,
    effectTitle: 'decrease in population of moose available to hunt',
    imageUrl:
      'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
  }] as TClimateFeed;

  // Todo - get the feed into the context provider

  return ( !!process.env.STORYBOOK_MOCK_CONTEXT ?
    <FeedContext.Provider value={mockfeed}>{children}</FeedContext.Provider> : <FeedContext.Provider value={climatefeed}>{children}</FeedContext.Provider>

    
  );
};
