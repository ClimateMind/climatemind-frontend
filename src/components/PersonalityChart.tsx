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
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const chartData = {
    datasets: [
      {
        label: 'Your Values',
        data: data,
      },
    ],
    labels,
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: COLORS.DK_TEXT,
        fontFamily: 'Bilo',
      },
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
        lineWidth: 2,
      },
      angleLines: {
        color: COLORS.PRIMARY,
        lineWidth: 2,
      },
      ticks: {
        beginAtZero: true,
        showLabelBackdrop: false,
        labels: {
          fontColor: COLORS.DK_TEXT,
          fontFamily: 'Bilo',
        },
      },
      pointLabels: {
        fontColor: COLORS.DK_TEXT,
        fontSize: 13,
        fontFamily: 'Bilo',
        // display: !isXS,
      },
    },
    elements: {
      point: {
        radius: 4,
        pointStyle: 'circle',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverRadius: 10,
        hitRadius: 10,
        backgroundColor: '#078DFF',
        hoverBorderWidth: 5,
      },
      line: {
        backgroundColor: '#078DFF80',
        borderColor: '#078DFF',
      },
    },
  };

  return (
    <Box my={2} mb={4}>
      <PageTitle variant="h2">Your Personal Value Web</PageTitle>
      {chartData && labels && data && (
        <Radar data={chartData} options={chartOptions} />
      )}
    </Box>
  );
}
