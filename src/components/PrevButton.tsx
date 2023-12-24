import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as ArrowBack } from '../assets/icon-arrow-back.svg';

const useStyles = makeStyles(() =>
  createStyles({
    backButtonContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: 0,
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontFamily: 'Bilo',
      fontSize: '14px',
      cursor: 'pointer',
      paddingTop: '6px',
    },
    flexChild: {
      '&:first-child': {
        marginRight: '10px',
        marginLeft: '-5px',
      },
      '&:last-child': {
        marginTop: '2px',
      },
    },
  })
);

export interface PrevButtonProps {
  text?: string;
  clickPrevHandler: () => void;
}

const PrevButton: React.FC<PrevButtonProps> = ({
  text,
  clickPrevHandler,
}: PrevButtonProps) => {
  const classes = useStyles();

  return (
    <div data-testid="PrevButton">
      <div
        className={classes.backButtonContainer}
        onClick={() => clickPrevHandler()}
      >
        <div className={classes.flexChild}>
          <ArrowBack />
        </div>
        <div className={classes.flexChild}>{text}</div>
      </div>
    </div>
  );
};

PrevButton.defaultProps = {
  text: 'Back',
};

export default PrevButton;
