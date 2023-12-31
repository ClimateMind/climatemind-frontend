import { useState } from 'react';
import { Card, Collapse, Grid, Typography } from '@mui/material';
import { capitalize } from '../../helpers/capitalize';
import { TPersonalValueIds } from '../../types/PersonalValues';
import { ExpanderIcon } from '../ExpanderIcon';
import { ValueIcon } from '../ValueIcon/ValueIcon';

export interface ValueCardProps {
  valueName: string;
  valueId: TPersonalValueIds;
  valueDescription: string;
  position?: number;
  matchPercent?: number;
  username?: string | undefined;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  valueName,
  valueId,
  valueDescription,
  position,
  matchPercent,
  username = null,
}) => {
  const matchWith = username !== null ? `with ${username}` : '';

  const getPositionText = (position: number): string | null => {
    switch (position) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return position !== undefined ? `${position}th` : null;
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card style={{ marginBottom: '8px', padding: '8px', maxWidth: '640px' }}>
      <Grid container justifyContent="space-around" direction="row">
        {/* Left Section - Icon and text */}
        <Grid
          container
          item
          xs={9}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* Card Icon */}
          <Grid
            xs={3}
            item
            style={{
              height: '80px',
              width: '80px',
              gridTemplateColumns: '1fr',
              gridTemplateRows: '1fr',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ValueIcon valueId={valueId} valueName={valueName} />
          </Grid>
          {/* Centre Text */}
          <Grid
            item
            xs={9}
            // style={{ border: '1px solid blue' }}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            style={{ paddingLeft: '30px' }}
          >
            <Grid item>
              <Typography data-cy="valueName" variant="h4" align="left">
                {capitalize(valueName)}
              </Typography>
              {position && (
                <Typography variant="h3" align="left">
                  {getPositionText(position)}
                </Typography>
              )}
              {matchPercent && (
                <Typography variant="h3">
                  <span data-cy="match-percentage">{`${matchPercent}`}</span>
                  {`% match `}
                  {matchWith}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <ExpanderIcon isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </Grid>
      </Grid>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Typography variant="body1" align="left" style={{ paddingLeft: '12px' }}>
          {valueDescription}
        </Typography>
      </Collapse>
    </Card>
  );
};
