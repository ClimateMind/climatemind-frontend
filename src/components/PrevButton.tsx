import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ReactComponent as ArrowBack } from '../assets/icon-arrow-back.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButtonContainer: {
      display: 'flex',
      padding: 0,
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontFamily: 'Bilo',
      fontSize: '14px',
      cursor: 'pointer',
    },
    flexChild: {
      flex: '1',
      '&:first-child': {
        marginRight: '10px',
        marginLeft: '-5px',
      },
      '&:last-child': {
        marginTop: '2px',
      }
    },
  }),
);

interface PrevButtonProps {
    text?: string,
    clickPrevHandler: () => void,
}

const PrevButton: React.FC<PrevButtonProps> = ({text, clickPrevHandler}: PrevButtonProps) => {

  const classes = useStyles();

    return (
      <div className={classes.backButtonContainer} onClick={() => clickPrevHandler()} data-testid="PrevButton">
        <div className={classes.flexChild}>
          <ArrowBack /> 
        </div>
        <div className={classes.flexChild}>
          {text}
        </div>
      </div>
    );
}

PrevButton.defaultProps = {
    text: 'Back'
}

export default PrevButton;