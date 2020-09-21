import React, { useState, useContext } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import GreenRadio from './GreenRadio';
import { TAnswers } from '../types/types';
import { ResponsesReducerContext } from '../contexts/responses';

type Props = {
  questionId: number; //Identify the question
  questionNumber: number; //Q1,Q2,Q3 Etc
  question: string;
  answers: TAnswers;
  setAnswer: (questionId: number, value: string) => void;
};

const styles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100vw',
    padding: '0',
  },
  formControl: {
    padding: '1em 0.3em 0 0',
  },
  questionHeader: {
    margin: '3em 0',
  },
  questionNumber: {
    marginRight: '1em',
  },
  answerContainer: {
    display: 'flex',
    '& > *': {
      display: 'inline-block',
    },
  },
});

const Question: React.FC<Props> = ({
  question,
  answers,
  questionId,
  setAnswer,
  questionNumber,
}) => {
  const classes = styles();
  const dispatch = useContext(ResponsesReducerContext);

  const [choosenAnswer, setChoosenAnswer] = useState(''); //Input Control

  // Controlled Input - Handle when the user picks an answer
  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choosenAnswer = e.target.value;
    setChoosenAnswer(e.target.value);
    setTimeout(() => {
      setAnswer(questionId, choosenAnswer);
      // Set the answer to state
      dispatch({
        type: 'ADD_SETONE',
        action: { questionId: `${questionId}`, answerId: choosenAnswer },
      });
    }, 200);
  };

  return (
    <>
      <Grid item data-testid="Question">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {/* Question Header - Number and Text */}
            <Grid item container className={classes.questionHeader}>
              <Grid item xs={3}>
                <Typography variant="h4" className={classes.questionNumber}>
                  Q{questionNumber}.
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle1">{question}</Typography>
              </Grid>
            </Grid>
          </FormLabel>
          {/* Question - Answer Text and Radios */}
          <RadioGroup
            aria-label="question"
            name={question}
            value={choosenAnswer}
            onChange={(e) => handleAnswer(e)}
          >
            <Grid container direction="column" justify="space-around">
              {answers.map((answer) => {
                return (
                  <FormControlLabel
                    className={classes.formControl}
                    value={`${answer.id}`}
                    key={answer.id}
                    control={<GreenRadio color="secondary" />}
                    label={answer.text}
                    labelPlacement="start"
                  />
                );
              })}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
};

export default Question;
