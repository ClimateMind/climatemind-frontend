import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import ROUTES from 'router/RouteConfig';
import { Page, PageContent } from 'shared/components';
import { Question, QuestionAnswers, QuizProgress } from 'features/quiz/components';
import { useFinishQuiz, useGetQuestions, useSaveAnswer } from 'features/quiz/hooks';
import { useAlignment } from 'features/userB';
import { useAppSelector } from 'store/hooks';

function QuizPageUserB() {
  const quizId = useAppSelector((state) => state.auth.userA.quizId);

  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { isLoading: isLoadingQuestions, questions } = useGetQuestions();
  const handleSaveAnswer = useSaveAnswer(1);
  const { isLoading: isLoadingSubmission, submitAnswers } = useFinishQuiz();

  const { createAlignment } = useAlignment();

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  function onSelectAnswer(answerId: number) {
    handleSaveAnswer(currentQuestionNumber, questions!.SetOne[currentQuestionNumber - 1].id, answerId);
    setCurrentQuestionNumber((current) => current + 1);
  }

  useEffect(() => {
    if (currentQuestionNumber === 11 && conversationId && quizId) {
      submitAnswers(1, true);
      createAlignment(conversationId, quizId);
      navigate(ROUTES.USERB_CORE_VALUES_PAGE + '/' + conversationId);
    }
  }, [currentQuestionNumber]);

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent style={{ paddingTop: 80 }}>
        <QuizProgress currentQuestionIndex={currentQuestionNumber} maxQuestionIndex={10} onBack={() => setCurrentQuestionNumber((current) => current - 1)} />

        {(isLoadingQuestions || isLoadingSubmission) && <CircularProgress style={{ color: 'gray' }} />}

        {currentQuestionNumber < 11 && questions && (
          <>
            <Question question={questions.SetOne[currentQuestionNumber - 1].question} />
            <QuestionAnswers onSelect={onSelectAnswer} />
          </>
        )}
      </PageContent>
    </Page>
  );
}

export default QuizPageUserB;
