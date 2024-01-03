import { useState } from 'react';
import { Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { TAnswers } from '../../../types/types';

import { CmTypography } from 'shared/components';

type Props = {
  questionId: number; //Identify the question
  questionNumber: number; //Q1,Q2,Q3 Etc
  question: string;
  answers: TAnswers;
  setAnswer: (questionId: number, value: string) => void;
  isSmall: boolean;
};

const Question: React.FC<Props> = ({
  question,
  answers,
  questionId,
  setAnswer,
  isSmall,
}) => {
  const [choosenAnswer, setChoosenAnswer] = useState(''); //Input Control

  // Controlled Input - Handle when the user picks an answer
  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choosenAnswer = e.target.value;
    setChoosenAnswer(e.target.value);

    // Scroll to top after each question
    window.scrollTo(0, 0);

    // Set Input State
    setTimeout(() => {
      setAnswer(questionId, choosenAnswer);
    }, 400);
  };

  return (
    <div style={styles.root} data-testid="Question">
      <FormControl component="fieldset">
        <Grid container>
          <Grid item xs={12}>
            <FormLabel
              component="legend"
              style={
                isSmall
                  ? styles.questionHeader
                  : styles.questionHeaderLargeScreen
              }
              id="questionText"
            >
              {question.split('\n\n').map((p, i) => (
                <CmTypography variant='body' style={{ fontSize: '18px', fontWeight: 'bold' }} key={i}>
                  {p}
                </CmTypography>
              ))}
            </FormLabel>
          </Grid>

          {/* Question - Answer Text and Radios */}
          <Grid item xs={12}>
            <RadioGroup
              aria-label="question"
              name={question}
              value={choosenAnswer}
              onChange={(e) => handleAnswer(e)}
            >
              {answers.map((answer) => {
                return (
                  <FormControlLabel
                    style={
                      isSmall
                        ? styles.formControl
                        : styles.formControlLargeScreen
                    }
                    value={`${answer.id}`}
                    key={answer.id}
                    control={
                      <Radio style={{ color: '#39F5AD', marginRight: isSmall ? 0 : 40 }} />
                    }
                    label={answer.text}
                    labelPlacement={isSmall ? 'start' : 'end'}
                  />
                );
              })}
            </RadioGroup>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    flexGrow: 1,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  formControl: {
    padding: '4px 0 !important',
    margin: '0 -8px 0 0',
  },
  formControlLargeScreen: {
    padding: '14px 0 !important',
  },
  questionHeader: {
    margin: '1em 0',
    width: '100%',
    minHeight: '100px',
    display: 'block',
  },
  questionHeaderLargeScreen: {
    marginTop: '64px',
    marginBottom: '1em',
    width: '100%',
    minHeight: '80px',
    display: 'block',
  },
  questionNumber: {
    marginRight: '1em',
  },
};

export default Question;
