import React, { useState } from 'react';
import Container from '../components/Container';
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
  question?: string;
  answers: string[];
  setAnswer?: () => void;
};

const styles = makeStyles({
  root: {
    flexGrow: 1,
    'min-height': '100vh',
    padding: '15vh 0',
  },
  typography: {
    letterSpacing: 1,
    fontWeight: 600,
    textAlign: 'center',
    wordSpacing: '100vw',
  },
});

const Question: React.FC<Props> = ({ question, answers, index }) => {
  const classes = styles();

  const [choosenAnswer, setChoosenAnswer] = useState('');

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoosenAnswer((e.target as HTMLInputElement).value);
  };

  return (
    <Container bgColor="#FFF">
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Box>
              <Typography variant="h4">Q{index}</Typography>
            </Box>
            <Typography variant="h5">{question}</Typography>
          </FormLabel>
          <RadioGroup
            aria-label="question"
            name={question}
            value={choosenAnswer}
            onChange={handleAnswer}
          >
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
          </RadioGroup>
        </FormControl>
      </Grid>
    </Container>
  );
};

export default Question;
