import { useEffect, useState } from 'react';
import { TClimateEffects } from 'types/types';
import { useAuth } from './auth/useAuth';
import { useErrorLogging } from './useErrorLogging';
import { useSession } from './useSession';
import { TSolutions } from 'types/Solutions';
import { ClimateApi } from 'api/ClimateApi';
import { useToastMessage } from 'shared/hooks';

export function useFeedData(forFeed: 'climate' | 'solutions') {
  const { showErrorToast } = useToastMessage();
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
        showErrorToast('Either log in or complete a quiz to view your climate feed.');
        logError("QuizId couldn't be found"!);
      }
      // If a user is logged in, we can fetch the quizId from the backend.
    } else {
      quizId = (await new ClimateApi(sessionId, accessToken).getQuizId())
        .quizId;
    }

    if (quizId) {
      if (forFeed === 'climate') {
        const response = await new ClimateApi(sessionId, accessToken).getFeed(
          quizId
        );
        return response.climateEffects;
      } else {
        const response = await new ClimateApi(
          sessionId,
          accessToken
        ).getSolutions(quizId);
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
