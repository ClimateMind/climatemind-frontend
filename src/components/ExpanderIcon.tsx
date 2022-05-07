import React from 'react';
import { CardActions, IconButton, Button, Grid } from '@material-ui/core/';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';

export interface ExpanderIconProps {
  isExpanded: boolean;
  setIsExpanded: (state: boolean) => any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      textAlign: 'center',
    },
    title: {
      fontFamily: 'atten-round-new',
      fontSize: 16,
      fontWeight: 900,
      marginLeft: '7pt',
      marginRight: '4pt',
      letterSpacing: '0.6pt',
      lineHeight: '1.4',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: '0px',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

export const ExpanderIcon: React.FC<ExpanderIconProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  const classes = useStyles();
  return (
    <div onClick={() => setIsExpanded(!isExpanded)}>
      <CardActions>
        <Grid container direction="column" alignItems="flex-end">
          <Button className={classes.title}>
            {isExpanded ? 'CLOSE' : 'MORE'}
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded,
            })}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <ArrowDown />
          </IconButton>
        </Grid>
      </CardActions>
    </div>
  );
};
