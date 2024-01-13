import { useNavigate } from 'react-router-dom';
import ROUTES from 'src/router/RouteConfig';

function useRetakeQuiz() {
  const navigate = useNavigate();

  function retakeQuiz() {
    navigate(ROUTES.QUIZ_PAGE, { state: { questionSetNumber: 1, retakeQuiz: true }});
  }

  function retakeQuizUserB(conversationId: string) {
    navigate(ROUTES.QUIZ_PAGE + '/' + conversationId, { state: { questionSetNumber: 1, retakeQuiz: true }});
  }

  return { retakeQuiz, retakeQuizUserB };
}

export default useRetakeQuiz;
