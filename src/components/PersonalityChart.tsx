import React from 'react';

import { COLORS } from '../common/styles/CMTheme';
import { Box } from '@material-ui/core';
import { Polar, defaults } from 'react-chartjs-2';
import { useMediaQuery } from '@material-ui/core';
import theme from '../common/styles/CMTheme';
import merge from 'lodash.merge';
import PageTitle from '../components/PageTitle';

export default function PersonalityChart() {
  // TODO: Add actual chart data
  const chartData = {
    datasets: [
      {
        data: [1.2, 3.4, 6.7, 9.8, 5.7, 6.9, 8.9, 3.4, 9.5, 5.3],
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

    labels: [
      'Conformity',
      'Tradition',
      'Benevolence',
      'Universalism',
      'Self-Direction',
      'Stimulation',
      'Hedonism',
      'Achievement',
      'Power',
      'Security',
    ],
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
