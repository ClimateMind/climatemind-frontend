import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import ROUTES from 'router/RouteConfig';
import { Page, PageContent } from 'shared/components';
import { FeedbackAnswer, Question, QuestionAnswers, QuizProgress } from 'features/quiz/components';
import { useGetQuestions, useSaveAnswer, useSendFeedback } from 'features/quiz/hooks';

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const questionSetNumber: number = location.state.questionSetNumber ?? 1;

  const withFeedback: boolean = location.state.withFeedback ?? true;

  const { isLoading: isLoadingQuestions, questions } = useGetQuestions();
  const handleSaveAnswer = useSaveAnswer(questionSetNumber);
  const sendFeedback = useSendFeedback();

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  function onSelectAnswer(answerId: number) {
    handleSaveAnswer(currentQuestionNumber, questions![questionSetNumber === 1 ? 'SetOne' : 'SetTwo'][currentQuestionNumber - 1].id, answerId);
    setCurrentQuestionNumber(current => current + 1);
  }

  function onSubmitFeedback(feedback: string) {
    sendFeedback(feedback);
    navigate(ROUTES.SUBMIT_SET_ONE_PAGE);
  }

  // Finish quiz for set one without feedback
  if (questionSetNumber === 1 && currentQuestionNumber === 11 && !withFeedback) {
    navigate(ROUTES.SUBMIT_SET_ONE_PAGE);
  }

  // Finish quiz for set two
  if (questionSetNumber === 2 && currentQuestionNumber === 11) {
    navigate(ROUTES.SUBMIT_SET_TWO_PAGE);
  }

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent style={{ paddingTop: 80 }}>
        <QuizProgress
          currentQuestionIndex={questionSetNumber === 1 ? currentQuestionNumber : currentQuestionNumber + 10}
          maxQuestionIndex={questionSetNumber === 1 ? 10 : 20}
          onBack={() => setCurrentQuestionNumber(current => current - 1)}
          alternativeText={currentQuestionNumber === 11 ? 'BONUS' : undefined}
        />

        {isLoadingQuestions && <CircularProgress style={{ color: 'gray' }} />}

        {currentQuestionNumber < 11 && questions && <>
          <Question question={questions[questionSetNumber === 1 ? 'SetOne' : 'SetTwo'][currentQuestionNumber - 1].question} />
          <QuestionAnswers onSelect={onSelectAnswer} />
        </>}

        {questionSetNumber === 1 && currentQuestionNumber === 11 && <>
          <Question question="What's stopping you from having climate conversations?" />
          <FeedbackAnswer onSubmit={onSubmitFeedback} />
        </>}
      </PageContent>
    </Page>
  );
};

export default QuizPage;
