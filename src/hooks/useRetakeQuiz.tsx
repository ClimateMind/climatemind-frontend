import { useNavigate, useLocation } from 'react-router-dom';

import { useAlignment } from '../hooks/useAlignment';
import ROUTES from '../router/RouteConfig';
import { useUserB } from './useUserB';

const useRetakeQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAlignmentScoresId } = useAlignment();
  const { conversationId, isUserBJourney } = useUserB();

  const retakeQuiz = () => {
    const path = isUserBJourney
      ? `${ROUTES.QUIZ_PAGE}/${conversationId}`
      : ROUTES.QUIZ_PAGE;

    // When user need to retake the quiz, the quiz id should be cleared from the session and the user should be directed to the questionairre page
    // The questionairre will direct the onward journey provded is userB is set for is user B

    // The alignment ID needs to be cleared so that can resubmit the alignment
    setAlignmentScoresId('');

    navigate(path, { state: { from: location.pathname, id: conversationId }});
  };

  return { retakeQuiz };
};

export default useRetakeQuiz;
