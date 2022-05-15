import {
  Card,
  Collapse,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
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
}

const styles = makeStyles({
  card: { marginBottom: '8px', padding: '8px', maxWidth: '640px' },
  cardText: { paddingLeft: '30px' },
  left_column: {},
  extraText: { paddingLeft: '12px' },
  iconContainer: {
    height: '80px',
    width: '80px',
    gidTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ValueCard: React.FC<ValueCardProps> = ({
  valueName,
  valueId,
  valueDescription,
  position,
  matchPercent,
}) => {
  const classes = styles();

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
    <Card className={classes.card}>
      <Grid container justifyContent="space-around" direction="row">
        {/* Left Section - Icon and text */}
        <Grid
          container
          item
          xs={9}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.left_column}
        >
          {/* Card Icon */}
          <Grid xs={3} item className={classes.iconContainer}>
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
            className={classes.cardText}
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
                  {`% match`}
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
        <Typography variant="body1" align="left" className={classes.extraText}>
          {valueDescription}
        </Typography>
      </Collapse>
    </Card>
  );
};
