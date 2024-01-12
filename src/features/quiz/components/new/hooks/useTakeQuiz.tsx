import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/hooks';
import { resetQuizAnswers } from 'features/quiz/state/quizSlice';
import ROUTES from 'router/RouteConfig';

function useTakeQuiz() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // Add conversationId if starting quiz for userB
  function startQuiz(conversationId?: string) {
    dispatch(resetQuizAnswers());

    if (conversationId) {
      navigate(ROUTES.QUIZ_PAGE + '/' + conversationId, { state: { questionSetNumber: 1 } });
    } else {
      navigate(ROUTES.QUIZ_PAGE, { state: { questionSetNumber: 1 } });
    }
  }

  function continueQuiz() {
    navigate(ROUTES.QUIZ_PAGE, { state: { questionSetNumber: 2 } });
  }

  return {
    startQuiz,
    continueQuiz,
  }
}

export default useTakeQuiz;
