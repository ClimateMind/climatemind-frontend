import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';

import GreenRadio from './GreenRadio'; //TODO -  probably a way to do this through the theme

type Props = {
  questionId: number; //Identify the question
  questionNumber: number; //Q1,Q2,Q3 Etc
  question: string;
  answers: string[];
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
    display: 'flex',
    marginRight: 'auto',
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

  const [choosenAnswer, setChoosenAnswer] = useState(''); //Input Control

  // Controlled Input - Handle when the user picks an answer
  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choosenAnswer = e.target.value;
    setChoosenAnswer(e.target.value);
    setTimeout(() => {
      setAnswer(questionId, choosenAnswer);
    }, 200);
  };

  return (
    <>
      <Grid item>
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
            <Grid
              item
              className={classes.answerContainer}
              container
              justify="space-between"
              alignContent="center"
            >
              {answers.map((answer, index) => {
                return (
                  <Grid item xs={12} container key={index}>
                    <FormControlLabel
                      className={classes.formControl}
                      value={`${index}`}
                      control={<GreenRadio />}
                      label={answer}
                      labelPlacement="start"
                    />
                  </Grid>
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
