import { useHistory } from 'react-router-dom';
import { useAlignment } from '../hooks/useAlignment';
import { useSession } from '../hooks/useSession';
import { ROUTES_CONFIG } from '../routes/routes';

const useRetakeQuiz = () => {
  const { clearSession } = useSession();
  const { push } = useHistory();
  const { setAlignmentScoresId } = useAlignment();

  const retakeQuiz = () => {
    // When user need to retake the quiz, the quiz id should be cleared from the session and the user should be directed to the questionairre page
    // The questionairre will direct the onward journey provded is userB is set for is user B
    clearSession();
    // The alignment ID needs to be cleared so that can resubmit the alignment
    setAlignmentScoresId('');
    push(ROUTES_CONFIG.ROUTE_QUIZ);
  };

  return { retakeQuiz };
};

export default useRetakeQuiz;
