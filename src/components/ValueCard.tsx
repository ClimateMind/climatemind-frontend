import {
  Card,
  Collapse,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ExpanderIcon } from './ExpanderIcon';
import { ValueIcon } from './ValueIcon';

export interface ValueCardProps {
  valueName: string;
  valueDescription: string;
  position?: number;
  matchPercent?: number;
  valueCardIcon?: React.FC;
}

const styles = makeStyles({
  card: { marginBottom: '8px', padding: '8px' },
  cardText: { paddingLeft: '16px' },
});

export const ValueCard: React.FC<ValueCardProps> = ({
  valueName,
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

  const upperCaseName = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={classes.card}>
      <Grid container direction="row" justify="space-between">
        {/* Card Icon */}
        <Grid item>
          <ValueIcon valueName="hedonism" />
        </Grid>
        {/* Centre Column */}
        <Grid item className={classes.cardText}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <Typography variant="h4">{upperCaseName(valueName)}</Typography>
            {position && (
              <Typography variant="h3">{getPositionText(position)}</Typography>
            )}
            {matchPercent && (
              <Typography variant="h3">{`${matchPercent}% match`}</Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <ExpanderIcon isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </Grid>
      </Grid>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Typography variant="body1">{valueDescription}</Typography>
      </Collapse>
    </Card>
  );
};
