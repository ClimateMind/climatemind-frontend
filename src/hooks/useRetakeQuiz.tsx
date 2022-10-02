import { useHistory, useLocation } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { useAlignment } from '../hooks/useAlignment';
import ROUTES from '../components/Router/RouteConfig';
import { useUserB } from './useUserB';

const useRetakeQuiz = () => {
  const { clearSession } = useSession();
  const { push } = useHistory();
  const location = useLocation();
  const { setAlignmentScoresId } = useAlignment();
  const { conversationId, isUserBJourney } = useUserB();

  const retakeQuiz = () => {
    const path = isUserBJourney
      ? `${ROUTES.ROUTE_QUIZ}/${conversationId}`
      : ROUTES.ROUTE_QUIZ;

    // When user need to retake the quiz, the quiz id should be cleared from the session and the user should be directed to the questionairre page
    // The questionairre will direct the onward journey provded is userB is set for is user B
    clearSession();
    // The alignment ID needs to be cleared so that can resubmit the alignment
    setAlignmentScoresId('');

    push({
      pathname: path,
      state: { from: location.pathname, id: conversationId },
    });
  };

  return { retakeQuiz };
};

export default useRetakeQuiz;
