import { Box, Card, CardContent } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../common/styles/CMTheme';
import React from 'react';

export type SummaryCardProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
};

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: '100%',
      border: `1px solid ${COLORS.CARD_BORDER}`,
    },
  })
);

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  children,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} data-testid={`summary-card-${title}`}>
      <CardContent>
        <Box mt={-1} mb={-2}>
          {title}
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
