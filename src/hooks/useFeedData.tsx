import { useEffect, useState } from 'react';
import getFeed from 'api/getFeed';
import getQuizId from 'api/getQuizId';
import { TClimateEffects } from 'types/types';
import { useAuth } from './auth/useAuth';
import { useErrorLogging } from './useErrorLogging';
import { useSession } from './useSession';
import { useToast } from './useToast';
import { getSolutions } from 'api/getSolutions';
import { TSolutions } from 'types/Solutions';

export function useFeedData(forFeed: 'climate' | 'solutions') {
  const { showToast } = useToast();
  const { logError } = useErrorLogging();
  const { accessToken, isLoading, isLoggedIn } = useAuth();
  const { sessionId } = useSession();

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
        showToast({
          message:
            'Either log in or complete a quiz to view your climate feed.',
          type: 'error',
        });
        logError("QuizId couldn't be found"!);
      }
      // If a user is logged in, we can fetch the quizId from the backend.
    } else {
      quizId = (await getQuizId(accessToken)).quizId;
    }

    if (quizId) {
      if (forFeed === 'climate') {
        const response = await getFeed(quizId);
        return response.climateEffects;
      } else {
        const response = await getSolutions(quizId);
        return response.solutions;
      }
    }
  };

  useEffect(() => {
    if (sessionId && sessionId !== '' && !isLoading) {
      fetchFeedData().then((res) => {
        if (forFeed === 'climate') {
          setClimateFeedData(res as TClimateEffects);
        } else {
          setSolutionsFeedData(res as TSolutions);
        }
      });
    }
  }, [isLoading, isLoggedIn, sessionId]);

  return { climateFeedData, solutionsFeedData };
}
