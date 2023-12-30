import React from 'react';
import { Grid } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ExploreIcon from '@mui/icons-material/Explore';

interface Props {
  actionType?: 'adaptation' | 'mitigation' | 'idea' | 'local';
}

const CardIcon: React.FC<Props> = ({ actionType = 'prevention' }) => {
  const isXs = false;

  const iconStyles = {
    fontSize: 30,
    margin: 0,
    padding: 0,
    width: isXs ? 40 : 80,
  };

  const getIcon = () => {
    switch (actionType) {
      case 'mitigation':
        return (
          <EmojiObjectsIcon
            data-testid="CardIconMitigation"
            style={iconStyles}
          />
        );
      case 'adaptation':
        return (
          <SecurityIcon data-testid="CardIconAdaptation" style={iconStyles} />
        );
      case 'idea':
        return (
          <EmojiObjectsIcon data-testid="CardIconIdea" style={iconStyles} />
        );
      case 'local':
        return <ExploreIcon data-testid="CardIconLocal" style={iconStyles} />;
      default:
        return null;
    }
  };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {getIcon()}
    </Grid>
  );
};

export default CardIcon;
