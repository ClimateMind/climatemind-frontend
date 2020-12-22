import React, { createContext, useState, useEffect } from 'react';

import { TClimateFeed } from '../types/types';
import { TClimateFeedContext } from '../types/types';

import { useSession } from '../hooks/useSession';
import getFeed from '../api/getFeed';

const initialState: TClimateFeedContext = {
  data: [] as TClimateFeed,
  isLoading: false,
  isError: false,
};

export const FeedContext = createContext<TClimateFeedContext>(initialState);

export const FeedContextDispatch = createContext<React.Dispatch<any>>(
  () => null
);

export const ClimateFeedProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([] as TClimateFeed);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { sessionId } = useSession();

  const callFeedApi = async (sessionId: string) => {
    try {
      setIsLoading(true);
      const data: any = await getFeed(sessionId);
      setData(data);
      setIsLoading(false);
      if(data.error){
        throw new Error('Climate Feed failed to load');
      }
    } catch(err) {
      console.error(err);
      setIsLoading(false);
      setIsError(true);
    }
  };

  // Refresh the data if the sessionId changes
  useEffect(() => {  
    if(sessionId){ 
      callFeedApi(sessionId);
    }
  },[sessionId]);

  // Update the state
  useEffect(() => {
    const newState = {
      data,
      isLoading,
      isError,
    };
    setState(newState);
  }, [setState, data, isLoading, isError]);

  const mockData = [{
      actionHeadline: "Reducing Food Waste -- mock",
      effectDescription: 'No short desc available at present. Uses Mock Data',
      effectId: 'R8t0oNsG3WgnupXsBVSjMHZ',
      effectScore: 14,
      effectTitle: 'increase in suicide',
      imageUrl:
        'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
    },
    {
      actionHeadline: "Reducing Food Waste -- mock",
      effectDescription: 'No short desc available at present. Uses Mock Data',
      effectId: 'R8epBa4UvcieLTynfK3E84u',
      effectScore: 14,
      effectTitle: 'decrease in population of moose available to hunt',
      imageUrl:
        'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
    }] as TClimateFeed;

  const mockState: TClimateFeedContext = {
    data: mockData,
    isLoading: false,
    isError: false,
  };
 
  return ( !!process.env.STORYBOOK_MOCK_CONTEXT ?
    <FeedContext.Provider value={mockState}>{children}</FeedContext.Provider> : 
    <FeedContext.Provider value={state}>
      <FeedContextDispatch.Provider value={setState}>
        {children}
      </FeedContextDispatch.Provider>
    </FeedContext.Provider>
  );
};
