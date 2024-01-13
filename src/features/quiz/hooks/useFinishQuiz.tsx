import { updateUserAInfo } from 'features/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTES from 'src/router/RouteConfig';
import { QuestionnaireFinishedEvent, analyticsService } from 'src/services';
import { useApiClient } from 'shared/hooks';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

function useFinishQuiz() {
  const navigate = useNavigate();
  const apiClient = useApiClient();

  const dispatch = useAppDispatch();
  const quizAnswers = useAppSelector(state => state.quiz.quizAnswers);

  const [isLoading, setIsLoading] = useState(false);

  async function submitAnswers(questionSetNumber: number) {
    setIsLoading(true);

    const result = await apiClient.postScores(quizAnswers);
    dispatch(updateUserAInfo({ quizId: result.quizId }));

    setIsLoading(false);

    analyticsService.postEvent(QuestionnaireFinishedEvent, questionSetNumber.toString());

    if (questionSetNumber === 1) {
      navigate(ROUTES.SUBMIT_SET_ONE_PAGE);
    } else {
      navigate(ROUTES.SUBMIT_SET_TWO_PAGE);
    }
  }

  return { isLoading, submitAnswers };
}

export default useFinishQuiz;
