import { useNavigate } from 'react-router-dom';
import ROUTES from 'router/RouteConfig';

function useRetakeQuiz() {
  const navigate = useNavigate();

  function retakeQuiz() {
    navigate(ROUTES.QUIZ_PAGE, { state: { questionSetNumber: 1, withFeedback: false }});
  }

  function retakeQuizUserB(conversationId: string) {
    navigate(ROUTES.QUIZ_PAGE + '/' + conversationId, { state: { questionSetNumber: 1 }});
  }

  return { retakeQuiz, retakeQuizUserB };
}

export default useRetakeQuiz;
