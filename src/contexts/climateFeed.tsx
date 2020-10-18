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

  // Todo - get the feed into the context provider

  return (
    <FeedContext.Provider value={climatefeed}>{children}</FeedContext.Provider>
  );
};
