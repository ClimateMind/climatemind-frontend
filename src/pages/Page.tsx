import React from 'react';
import Wrapper from '../components/Wrapper';
import { COLORS } from '../common/styles/CMTheme';
import { Box, Typography } from '@material-ui/core';
import { Polar } from 'react-chartjs-2';

const chartData = {
  datasets: [
    {
      data: [1.2, 3.4, 6.7, 9.8, 5.7, 6.9, 8.9, 3.4, 9.5, 5.3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        COLORS.ACCENT1,
        COLORS.ACCENT2,
        COLORS.ACCENT3,
        COLORS.ACCENT4,
        COLORS.ACCENT5,
        COLORS.SUCCESS,
        COLORS.PRIMARY,
        COLORS.WARNING,
      ],
      labels: [
        'conformity',
        'tradition',
        'benevolence',
        'universalism',
        'self-direction',
        'stimulation',
        'hedonism',
        'achievement',
        'power',
        'security',
      ],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

export default function Page() {
  return (
    <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
      <Box my={2} mb={4}>
        <Typography variant="h3">Your Climate Personality</Typography>
      </Box>
      <Polar data={chartData} width={400} legend={false} />
    </Wrapper>
  );
}
