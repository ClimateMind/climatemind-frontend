import { Box } from '@material-ui/core';
import React from 'react';
import { Radar } from '@iftek/react-chartjs-3';
import { COLORS } from '../common/styles/CMTheme';
import PageTitle from './PageTitle';
import { useClimatePersonality } from '../hooks/useClimatePersonality';

export default function PersonalityChart() {
  const { valueScores } = useClimatePersonality();
  const scores = valueScores?.map((value) => value.score);
  const labels = valueScores?.map((value) => value.personalValue);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Your Values',
        borderColor: COLORS.CHART1,
        backgroundColor: COLORS.CHART1,
        pointBackgroundColor: COLORS.CHART1,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        data: scores,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        // startAngle: 150,
        min: 0,
        max: 6,
        angleLines: {
          color: '#FFFFFF',
          lineWidth: 2,
        },
        ticks: {
          showLabelBackdrop: false,
          font: {
            size: 14,
            family: 'Bilo',
          },
        },
        grid: {
          color: '#FFFFFF',
          lineWidth: 2,
          borderWidth: 2,
          // circular: true,
        },
        pointLabels: {
          font: {
            size: 14,
            family: 'Bilo',
          },
          padding: 12,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
            family: 'Bilo',
          },
        },
      },
    },
  };

  return (
    <Box my={2} mb={4}>
      <PageTitle variant="h2">Your Personal Value Web</PageTitle>

      <Radar data={data} options={options} />
    </Box>
  );
}
