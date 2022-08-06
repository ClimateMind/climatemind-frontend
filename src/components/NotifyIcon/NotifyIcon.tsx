import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TConversationState } from '../../types/Conversation';

const useStyles = makeStyles(() =>
  createStyles({
    notifyIcon: {
      margin: '0 0 1.5em',
      backgroundColor: '#B00020',
      height: '16px',
      width: '16px',
      borderRadius: '50%',
      fontSize: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      color: 'white',
      fontSize: '13px',
      fontWeight: 800,
      padding: '1px 6px 2px',
    },
  })
);

export interface NotifyIconProps {
  state: TConversationState;
}

export const NotifyIcon: React.FC<NotifyIconProps> = ({ state }) => {
  const classes = useStyles();

  // eslint-disable-next-line
  if (state == TConversationState.UserBInvited) return null;
  // eslint-disable-next-line
  if (state == TConversationState.RatingDone) return null;

  return (
    <div className={classes.notifyIcon} data-testid={`NotifyIcon-${state}`}>
      <Grid>
        <Typography className={classes.iconText}>1</Typography>
      </Grid>
    </div>
  );
};
