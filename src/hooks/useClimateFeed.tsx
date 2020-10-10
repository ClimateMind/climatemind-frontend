import { useContext } from 'react';
import { FeedContext } from '../contexts/climateFeed';

export const useClimatePersonality = () => {
  const climateFeed = useContext(FeedContext);
  
  return climateFeed;
};