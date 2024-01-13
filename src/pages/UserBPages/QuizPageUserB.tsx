import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { SingleQuestion, useAnswerSelected, useGetQuestions } from "features/quiz";
import { Page, PageContent } from "shared/components";
import { useApiClient } from "shared/hooks";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { updateUserBInfo } from "features/auth";
import ROUTES from "src/router/RouteConfig";

function QuizPageUserB() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const apiClient = useApiClient();

  const dispatch = useAppDispatch();
  const quizAnswers = useAppSelector(state => state.quiz.quizAnswers);

  const { isLoading: isLoadingQuestions, questions } = useGetQuestions();
  const handleAnswerSelected = useAnswerSelected(1);

  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  if (currentQuestionNumber === 11) {
    setIsLoadingSubmission(true);
    apiClient.postScores(quizAnswers).then((response) => {
      dispatch(updateUserBInfo({ quizId: response.quizId }));
      navigate(`${ROUTES.USERB_CORE_VALUES_PAGE}/${conversationId}`);
    }).finally(() => {
      setIsLoadingSubmission(false);
    });

    setCurrentQuestionNumber(1);
    return null;
  }

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent>
        {(isLoadingQuestions || isLoadingSubmission) && <CircularProgress style={{ color: 'gray' }} />}

        {questions && currentQuestionNumber < 11 && <SingleQuestion
          currentQuestionIndex={currentQuestionNumber}
          maxQuestionIndex={10}
          question={questions?.SetOne[currentQuestionNumber - 1].question.toString()}
          onSelect={(index: number) => {
            const questionId = questions?.SetOne[currentQuestionNumber - 1].id

            handleAnswerSelected(currentQuestionNumber, questionId, index);
            setCurrentQuestionNumber(current => current + 1);
          }}
          onBack={() => setCurrentQuestionNumber(current => current - 1)}
          onSubmitFeedback={() => {}}
        />}
      </PageContent>
    </Page>
  );
}

export default QuizPageUserB;
