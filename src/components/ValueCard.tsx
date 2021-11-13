import { Box, Typography, Grid } from '@material-ui/core';
import React from 'react';
import CMCard from '../components/Card';

interface ValueCardProps {
  valueName: string;
  valueDescription: string;
  position: number;
  valueCardIcon?: React.FC;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  valueName,
  valueDescription,
  position,
}) => {
  const getPositionText = (position: number) => {
    switch (position) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${position}th`;
    }
  };

  const upperCaseName = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Box textAlign="center" pb={1}>
      <CMCard>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Typography variant="h4">{upperCaseName(valueName)}</Typography>
          <Typography variant="h3">{getPositionText(position)}</Typography>
        </Grid>
      </CMCard>
    </Box>
  );
};
