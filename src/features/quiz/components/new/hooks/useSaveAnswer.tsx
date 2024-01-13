import { QuestionStartEvent, analyticsService } from 'services';
import { useAppDispatch } from 'store/hooks';
import { addQuizAnswer } from '../../../state/quizSlice';

function useSaveAnswer(questionSetNumber: number) {
  const dispatch = useAppDispatch();

  function handleSaveAnswer(questionNumber: number,questionId: number,answerId: number) {
    dispatch(
      addQuizAnswer({
        questionSet: questionSetNumber,
        questionId,
        answerId,
      })
    );

    analyticsService.postEvent(QuestionStartEvent, `${questionId}:${questionNumber}`);
  }

  return handleSaveAnswer;
}

export default useSaveAnswer;
