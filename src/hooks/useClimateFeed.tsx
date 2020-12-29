import { useContext } from 'react';
import { FeedContext } from '../contexts/climateFeed';

export const useClimateFeed = () => {
  const state = useContext(FeedContext);
  const climateFeed = state.data;
  const climateFeedError = state.isError;
  const climateFeedLoading = state.isLoading;

  return {
    climateFeed,
    climateFeedError,
    climateFeedLoading,
  };
};
