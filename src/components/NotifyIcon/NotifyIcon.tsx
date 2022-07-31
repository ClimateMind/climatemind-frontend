import { Button, Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import ROUTES from '../Router/RouteConfig';
import { useHistory } from 'react-router-dom';

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

export interface NotifyIconProps {}

export const NotifyIcon: React.FC<NotifyIconProps> = ({}) => {
  const classes = useStyles();

  return (
    <div className={classes.notifyIcon}>
      <Grid>
        <Typography className={classes.iconText}>1</Typography>
      </Grid>
    </div>
  );
};
