import React from 'react';
import { Grid } from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import SecurityIcon from '@material-ui/icons/Security';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

interface Props {
  actionType?: 'adaptation' | 'mitigation' | 'idea';
}

const CardIcon: React.FC<Props> = ({ actionType = 'prevention' }) => {
  const iconStyles = { fontSize: 30, margin: 0, padding: 0 };

  const getIcon = () => {
    switch (actionType) {
      case 'adaptation':
        return (
          <NotInterestedIcon
            data-testid="CardIconPrevention"
            style={iconStyles}
          />
        );
      case 'mitigation':
        return (
          <SecurityIcon data-testid="CardIconProtection" style={iconStyles} />
        );
      case 'idea':
        return (
          <EmojiObjectsIcon data-testid="CardIconIdea" style={iconStyles} />
        );
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

export default CardIcon;
