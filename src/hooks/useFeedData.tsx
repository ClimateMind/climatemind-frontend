import { useEffect, useState } from 'react';
import { TClimateEffects } from 'types/types';
import { useErrorLogging } from './useErrorLogging';
import { TSolutions } from 'types/Solutions';
import { useApiClient, useToastMessage } from 'shared/hooks';
import { useAppSelector } from 'store/hooks';

export function useFeedData(forFeed: 'climate' | 'solutions') {
  const apiClient = useApiClient();
  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const { isLoggedIn, user, sessionId  } = useAppSelector(state => state.auth);

  const [climateFeedData, setClimateFeedData] = useState<TClimateEffects>();
  const [solutionsFeedData, setSolutionsFeedData] = useState<TSolutions>();

  const fetchFeedData = async () => {
    let quizId: string | undefined = undefined;

    // If a user isn't logged in, we take the quizId from the localStorage, as
    // he just finished the quiz before seeing the feed.
    if (!isLoggedIn) {
      if (localStorage.getItem('quizId')) {
        quizId = localStorage.getItem('quizId')!.replaceAll('"', '');
      } else {
        showErrorToast('Either log in or complete a quiz to view your climate feed.');
        logError("QuizId couldn't be found"!);
      }
      // If a user is logged in, we can fetch the quizId from the backend.
    } else {
      quizId = user.quizId
    }

    if (quizId) {
      if (forFeed === 'climate') {
        const response = await apiClient.getClimateFeed();
        return response;
      } else {
        const response = await apiClient.getSolutionsFeed();
        return response;
      }
    }
  };

  useEffect(() => {
    if (sessionId && sessionId !== '') {
      fetchFeedData().then((res) => {
        if (forFeed === 'climate') {
          setClimateFeedData(res as TClimateEffects);
        } else {
          setSolutionsFeedData(res as TSolutions);
        }
      });
    }
  }, [isLoggedIn, sessionId]);

  return { climateFeedData, solutionsFeedData };
}
