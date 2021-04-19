import { Box, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import theme, { COLORS } from '../common/styles/CMTheme';
import PageTitle from '../components/PageTitle';
import { useClimatePersonality } from '../hooks/useClimatePersonality';

export default function PersonalityChart() {
  const { valueScores } = useClimatePersonality();
  const data = valueScores?.map((value) => value.score);
  const labels = valueScores?.map((value) => value.personalValue);
  const isXS = useMediaQuery(theme.breakpoints.down('sm'));
  const chartData = {
    datasets: [
      {
        label: 'Your Personal Score',
        data: data,
      },
    ],
    labels,
  };

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltips: {
      callbacks: {
        title: (e: any) => {
          const event = e[0];
          const valueName = labels[event.index];
          return valueName.toLocaleUpperCase();
        },
      },
    },
    scale: {
      gridLines: {
        color: COLORS.PRIMARY,
      },
      angleLines: {
        color: COLORS.PRIMARY,
      },
      ticks: {
        beginAtZero: false,
        backdropPaddingX: 4,
        backdropPaddingY: 2,
      },
      pointLabels: {
        fontColor: 'white',
        fontSize: 13,
        display: !isXS,
      },
    },
    elements: {
      point: {
        radius: 6,
        pointStyle: 'circle',
        backgroundColor: COLORS.SECONDARY,
        borderWidth: 2,
        borderColor: 'rgba(255, 99, 132, 1)',
        hoverRadius: 40,
        hitRadius: 10,
        hoverBorderWidth: 5,
      },
      line: {
        backgroundColor: 'rgba(184, 244,252, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    },
  };

  return (
    <Box my={2} mb={4}>
      <PageTitle variant="h2">Your Personal Values</PageTitle>
      {chartData && labels && data && (
        <Radar
          data={chartData}
          // width={!isXS ? 800 : 0}
          options={chartOptions}
        />
      )}
    </Box>
  );
}
