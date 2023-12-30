import React from 'react';
import { CardActions, IconButton, Grid } from '@mui/material';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import { CmButton } from 'shared/components';

export interface ExpanderIconProps {
  isExpanded: boolean;
  setIsExpanded: (state: boolean) => any;
}

export const ExpanderIcon: React.FC<ExpanderIconProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  return (
    <div onClick={() => setIsExpanded(!isExpanded)}>
      <CardActions>
        <Grid container direction="column" alignItems="flex-end">
          <CmButton
            variant='text'
            text={isExpanded ? 'LESS' : 'MORE'}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <IconButton
            style={{
              marginLeft: '0px',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
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
