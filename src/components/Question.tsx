import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
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
    width: '100%',
    padding: 0,
    margin: 0,
  },
  answers: {},
  formControl: {
    padding: '4px 0 !important',
    margin: '0 -8px 0 0',
  },
  questionHeader: {
    margin: '1em 0',
    width: '100%',
    minHeight: '150px',
    display: 'block',
  },
  questionHeaderMd: {
    margin: '3em 0',
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
    }, 400);
  };

  return (
    <div className={classes.root} data-testid="Question">
      <FormControl component="fieldset">
        <Grid container>
          <Grid item xs={12}>
            <FormLabel
              component="legend"
              className={classes.questionHeader}
              id="questionText"
            >
              <Paragraphs text={question} fontSize="18px" bold />
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
                    className={classes.formControl}
                    value={`${answer.id}`}
                    key={answer.id}
                    control={<GreenRadio color="secondary" />}
                    label={answer.text}
                    labelPlacement="start"
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

export default Question;
