import { useState } from 'react';
import { FormLabel, useMediaQuery } from '@mui/material';

import Question from '../../features/quiz/components/Question';
import { useQuestions } from '../../hooks/useQuestions';
import { useQuiz } from '../../hooks/useQuiz';
import Error500 from './Error500Page';
import { usePostFeedback } from '../../hooks/usePostFeedback';
import { CmBackButton, CmButton, CmLoader, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import { ProgressBar } from 'features/quiz/components';

function QuizPage() {
  const { currentQuestion, answers, progress, setProgress, questionsError, questionsLoading, setAnswer, changeQuestionBackward } = useQuiz();
  const { currentSet } = useQuestions();
  const { submitFeedback } = usePostFeedback();

  const [textInputValue, setTextInputValue] = useState('');
  const isXS = useMediaQuery('(max-width:600px)');

  const finishQuizHandler = () => {
    // Only save the feedback if it's not empty
    if (textInputValue.trim()) {
      submitFeedback(textInputValue.trim());
    }

    setProgress(11);
  };

  if (questionsError) {
    return <Error500 />;
  }

  if (questionsLoading || !answers) {
    return <CmLoader />;
  }

  const totalQuestions = currentSet === 1 ? 10 : 20;

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent style={{ paddingTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {progress > 0 && isXS && <CmBackButton text='Previous' onClick={changeQuestionBackward} />}
          <CmTypography variant="h3" style={{ color: '#77AAAF' }}>
            {currentSet === 2
              ? `Q${progress + 11}`
              : progress === 10
              ? ''
              : `Q${progress + 1}`}
            <span data-testid="totalQuestions" style={styles.totalQuestions}>
              {progress === 10 ? 'BONUS' : `/${totalQuestions}`}
            </span>
          </CmTypography>
        </div>

        <ProgressBar progress={progress} />

        {progress < 10 && currentQuestion ? (
          <Question
            key={currentQuestion.id}
            questionNumber={progress + 1}
            questionId={currentQuestion.id}
            question={currentQuestion.question}
            answers={answers}
            setAnswer={setAnswer}
            isSmall={isXS}
          />
        ) : (
          <>
            <FormLabel component="legend" style={ isXS ? styles.questionHeader : styles.questionHeaderLargeScreen } id="questionText">
              <CmTypography variant='body' style={{ fontSize: '18px', fontWeight: 'bold' }}>
                What's stopping you from having climate conversations?
              </CmTypography>
            </FormLabel>
            <CmTextInput
              margin="none"
              fullWidth={true}
              variant="filled"
              color="secondary"
              onChange={(e) => setTextInputValue(e.target.value)}
            />
          </>
        )}

        {progress < 10 && !isXS && <CmBackButton text='Previous' onClick={changeQuestionBackward} style={{ alignSelf: 'flex-start', marginTop: 30 }} />}

        {progress >= 10 && !isXS && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CmBackButton text='Previous' onClick={changeQuestionBackward} />
            <CmButton text='Finish Quiz' onClick={finishQuizHandler} />
          </div>
        )}

        {progress >= 10 && isXS && (
          <CmButton text='Finish Quiz' onClick={finishQuizHandler} />
        )}
      </PageContent>
    </Page>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  prevButtonContainer: {
    height: '24px',
  },
  pageContainer: {
    maxWidth: '640px',
  },
  prevButtonLagreScreen: {
    marginTop: '75px',
  },
  totalQuestions: {
    fontSize: '16px',
  },
  questionHeader: {
    margin: '1em 0',
    width: '100%',
    display: 'block',
  },
  questionHeaderLargeScreen: {
    marginTop: '64px',
    marginBottom: '1em',
    width: '100%',
    display: 'block',
  },
};

export default QuizPage;
