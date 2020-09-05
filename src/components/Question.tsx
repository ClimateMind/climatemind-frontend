import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from '@material-ui/core';

type Props = {
  index: number;
  questionNumber: number;
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
  index,
  setAnswer,
  questionNumber,
}) => {
  const classes = styles();

  const [choosenAnswer, setChoosenAnswer] = useState('');

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choosenAnswer = e.target.value;
    setChoosenAnswer(e.target.value);
    setTimeout(() => {
      setAnswer(index, choosenAnswer);
    }, 200);
  };

  useEffect(() => {
    setChoosenAnswer('');
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={10}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Grid container>
              <Grid item xs={2}>
                <Box>
                  <Typography variant="h4">Q{questionNumber}</Typography>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5">{question}</Typography>
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
                      control={<Radio />}
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
