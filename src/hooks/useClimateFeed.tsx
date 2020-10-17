import { useContext } from 'react';
import { FeedContext } from '../contexts/climateFeed';

export const useClimateFeed = () => {
  const climateFeed = useContext(FeedContext);
  
  return climateFeed;
};