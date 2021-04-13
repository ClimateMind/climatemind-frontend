import { Box, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Polar } from 'react-chartjs-2';
import theme, { COLORS } from '../common/styles/CMTheme';
import PageTitle from '../components/PageTitle';
import { useClimatePersonality } from '../hooks/useClimatePersonality';

export default function PersonalityChart() {
  // TODO: Add actual chart data
  const { valueScores } = useClimatePersonality();
  const data = valueScores?.map((value) => value.score);
  const labels = valueScores?.map((value) => value.personalValue);

  const chartData = {
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          COLORS.ACCENT1,
          COLORS.ACCENT2,
          COLORS.ACCENT3,
          COLORS.ACCENT4,
          COLORS.ACCENT5,
          COLORS.SUCCESS,
          COLORS.PRIMARY,
          COLORS.WARNING,
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs

    labels,
  };

  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Box my={2} mb={4}>
      <PageTitle variant="h2">Your Personal Values</PageTitle>
      <Polar
        data={chartData}
        // width={isXS ? 100 : 800}
        height={isXS ? 100 : 300}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    </Box>
  );
}
