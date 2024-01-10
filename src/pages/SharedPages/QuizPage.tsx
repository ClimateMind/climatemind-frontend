import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useApiClient } from 'shared/hooks';
import { Page, PageContent } from 'shared/components';
import { useGetQuestions, useAnswerSelected, SingleQuestion, useFinishQuiz } from 'features/quiz';

function QuizPage() {
  const apiClient = useApiClient();

  const location = useLocation();
  const questionSetNumber: number = location.state.questionSetNumber || 1;
  const isRetakingQuiz: boolean = location.state.retakeQuiz || false;
  const { isLoading: isLoadingSubmission, submitAnswers } = useFinishQuiz();

  const { isLoading: isLoadingQuestions, questions } = useGetQuestions();
  const handleAnswerSelected = useAnswerSelected(questionSetNumber);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  function getQuestionText() {
    if (currentQuestionNumber === 11 && questionSetNumber === 1) return '';

    return questionSetNumber === 1 ? questions!.SetOne[currentQuestionNumber - 1].question : questions!.SetTwo[currentQuestionNumber - 1].question
  }

  function handleSubmitFeedback(feedback: string) {
    setCurrentQuestionNumber(current => current + 1);

    if (feedback === '') return;
    apiClient.postFeedback(feedback);
  }

  // If the user answered all 10 questions, we will submit the result, reset the quiz
  // to be prepared for the next quiz take and navigate away
  if (
    (questionSetNumber === 1 && currentQuestionNumber === 11 && isRetakingQuiz) ||
    (questionSetNumber === 1 && currentQuestionNumber === 12) ||
    (questionSetNumber === 2 && currentQuestionNumber === 11)
  ) {
    setCurrentQuestionNumber(1);
    submitAnswers(questionSetNumber);

    return null;
  }

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent  style={{ paddingTop: 80 }}>
        {(isLoadingQuestions || isLoadingSubmission) && <CircularProgress style={{ color: 'gray' }} />}

        {questions && <SingleQuestion
          currentQuestionIndex={questionSetNumber === 1 ? currentQuestionNumber : currentQuestionNumber + 10}
          maxQuestionIndex={questionSetNumber === 1 ? 10 : 20}
          question={getQuestionText()}
          onSelect={(index: number) => {
            const questionId = questionSetNumber === 1
              ? questions?.SetOne[currentQuestionNumber - 1].id
              : questions?.SetTwo[currentQuestionNumber - 1].id;

              handleAnswerSelected(currentQuestionNumber, questionId, index);
              setCurrentQuestionNumber(current => current + 1);
          }}
          onBack={() => setCurrentQuestionNumber(current => current - 1)}
          onSubmitFeedback={handleSubmitFeedback}
        />}
      </PageContent>
    </Page>
  );
};

export default QuizPage;
