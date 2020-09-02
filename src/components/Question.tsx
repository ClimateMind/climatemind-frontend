import React from 'react';
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

  const handleChange = () => {
    console.log('Clicked');
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
            <Typography variant="h2">Q{index}</Typography>
            <Typography variant="h3">{question}</Typography>
          </FormLabel>
          <RadioGroup
            aria-label="question"
            name={question}
            value={question}
            onChange={handleChange}
          >
            {answers.map((answer, index) => {
              return (
                <FormControlLabel
                  value={index}
                  key={index}
                  control={<Radio />}
                  label={answer}
                  labelPlacement="start"
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Container>
  );
};

export default Question;
