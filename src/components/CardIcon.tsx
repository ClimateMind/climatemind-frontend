import React from 'react';
import { Grid } from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import SecurityIcon from '@material-ui/icons/Security';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

interface Props {
  actionType?: 'protection' | 'prevention' | 'idea';
}

export const ActionIcon: React.FC<Props> = ({ actionType = 'prevention' }) => {
  const iconStyles = { fontSize: 30, margin: 0, padding: 0 };

  const getIcon = () => {
    switch (actionType) {
      case 'prevention':
        return <NotInterestedIcon style={iconStyles} />;
      case 'protection':
        return <SecurityIcon style={iconStyles} />;
      case 'idea':
        return <EmojiObjectsIcon style={iconStyles} />;
      default:
        return null;
    }
  };
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {getIcon()}
    </Grid>
  );
};
