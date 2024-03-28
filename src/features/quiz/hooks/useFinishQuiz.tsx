import { useState } from 'react';

import { QuestionnaireFinishedEvent, analyticsService } from 'services';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useApiClient } from 'shared/hooks';
import { updateUserAInfo, updateUserBInfo } from 'features/auth';

function useFinishQuiz() {
  const apiClient = useApiClient();

  const dispatch = useAppDispatch();
  const quizAnswers = useAppSelector(state => state.quiz.quizAnswers);

  const [isLoading, setIsLoading] = useState(false);

  async function submitAnswers(questionSetNumber: number, isUserB = false) {
    setIsLoading(true);

    const result = await apiClient.postScores(quizAnswers);
    if (isUserB) {
      dispatch(updateUserBInfo({ quizId: result.quizId }));
    } else {
      dispatch(updateUserAInfo({ quizId: result.quizId }));
    }

    setIsLoading(false);

    analyticsService.postEvent(QuestionnaireFinishedEvent, questionSetNumber.toString());
  }

  return { isLoading, submitAnswers };
}

export default useFinishQuiz;
