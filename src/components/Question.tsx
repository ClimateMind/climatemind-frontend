import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GreenRadio from './GreenRadio';
import { TAnswers } from '../types/types';
import Paragraphs from './Paragraphs';

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
    padding: 0,
    margin: 0,
  },
  answers: {
    width: '100%',
  },
  formControl: {
    padding: '4px 0 !important',
    margin: '0',
  },
  questionHeader: {
    marginBottom: '1em',
    minHeight: '150px',
  },
  questionHeaderMd: {
    margin: '3em 0',
    width: '50vw',
    minHeight: '120px',
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
    // Set Input State
    setTimeout(() => {
      setAnswer(questionId, choosenAnswer);
    }, 200);
  };

  const matchesMd = useMediaQuery('(min-width:600px)', { noSsr: true });

  return (
    <>
      <Grid item data-testid="Question" className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {/* Question Header - Number and Text */}
            <Grid
              item
              container
              className={
                matchesMd ? classes.questionHeaderMd : classes.questionHeader
              }
            >
              <Grid item>
                <Paragraphs text={question} fontSize="18px" bold />
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
              container
              direction="column"
              justify="space-between"
              className={classes.answers}
            >
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
