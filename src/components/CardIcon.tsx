import React from 'react';
import { Grid } from '@material-ui/core';
import SecurityIcon from '@material-ui/icons/Security';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ExploreIcon from '@material-ui/icons/Explore';
import { useBreakpoint } from '../hooks/useBreakpoint';

interface Props {
  actionType?: 'adaptation' | 'mitigation' | 'idea' | 'local';
}

const CardIcon: React.FC<Props> = ({ actionType = 'prevention' }) => {
  const { isXs } = useBreakpoint();

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
