import { useHistory } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import ROUTES from '../components/Router/RouteConfig';

const useRetakeQuiz = () => {
  const { clearSession } = useSession();
  const { push } = useHistory();

  const retakeQuiz = () => {
    // When user need to retake the quiz, the quiz id should be cleared from the session and the user should be directed to the questionairre page
    // The questionairre will direct the onward journey provded is userB is set for is user B
    clearSession();
    push(ROUTES.ROUTE_QUIZ);
  };

  return { retakeQuiz };
};

export default useRetakeQuiz;
