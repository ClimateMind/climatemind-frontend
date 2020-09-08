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
    width: '100vw',
    padding: '0',
  },
  formControl: {
    padding: '1em 0.3em 0 0',
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
      // direction="row"
      // justify="center"
      // alignItems="center"
      // className={classes.root}
    >
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Grid container spacing={7}>
              <Grid item xs={2}>
                <Typography variant="h4">Q{questionNumber}.</Typography>
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
            <Box component="div" height="100%" padding="2em .4em 0 0">
              <Grid container direction="column" justify="space-around">
                {answers.map((answer, index) => {
                  return (
                    <FormControlLabel
                      className={classes.formControl}
                      value={`${index}`}
                      key={index}
                      control={<GreenRadio color="secondary" />}
                      label={answer}
                      labelPlacement="start"
                    />
                  );
                })}
              </Grid>
            </Box>
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Question;
