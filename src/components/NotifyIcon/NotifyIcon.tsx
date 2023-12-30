import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { CmTypography } from 'shared/components';

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
        <CmTypography variant='label' style={{ color: 'white', position: 'relative', left: 1 }}>1</CmTypography>
      </Grid>
    </div>
  );
};
