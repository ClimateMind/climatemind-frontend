import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Box,
} from '@material-ui/core';
import GreenRadio from './GreenRadio';

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
    'min-height': '100vh',
    padding: '15vh 0',
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

  // Handle when the user pick an answer
  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choosenAnswer = e.target.value;
    setChoosenAnswer(e.target.value);
    setTimeout(() => {
      setAnswer(questionId, choosenAnswer);
    }, 200);
  };

  return (
    <Grid
      data-testid="Question"
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={11}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Grid container spacing={6}>
              <Grid item xs={2}>
                <Box>
                  <Typography variant="h4">Q{questionNumber}.</Typography>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle1">{question}</Typography>
              </Grid>
            </Grid>
          </FormLabel>
          <RadioGroup
            aria-label="question"
            name={question}
            value={choosenAnswer}
            onChange={(e) => handleAnswer(e)}
          >
            <Box paddingY={4}>
              {answers.map((answer, index) => {
                return (
                  <Box key={index} textAlign="center" m={1}>
                    <FormControlLabel
                      value={`${index}`}
                      key={index}
                      control={<GreenRadio color="secondary" />}
                      label={answer}
                      labelPlacement="start"
                    />
                  </Box>
                );
              })}
            </Box>
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Question;
