import { useAppDispatch } from "src/store/hooks";
import { addQuizAnswer } from "../state/quizSlice";
import { QuestionStartEvent, analyticsService } from "src/services";

function useAnswerSelected(questionSetNumber: number) {
  const dispatch = useAppDispatch();

  function handleAnswerSelected(questionNumber: number, questionId: number, answerId: number) {
    dispatch(addQuizAnswer({
      questionSet: questionSetNumber,
      questionId,
      answerId,
    }));

    analyticsService.postEvent(QuestionStartEvent, `${questionId}:${questionNumber}`);
  }

  return handleAnswerSelected;
}

export default useAnswerSelected;
