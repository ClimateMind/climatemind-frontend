import { Box } from '@material-ui/core';
import React from 'react';
import { Radar } from '@iftek/react-chartjs-3';
import { COLORS } from '../common/styles/CMTheme';
import PageTitle from '../components/PageTitle';
import { useClimatePersonality } from '../hooks/useClimatePersonality';

export default function PersonalityChart() {
  const { valueScores } = useClimatePersonality();
  const scores = valueScores?.map((value) => value.score);
  const labels = valueScores?.map((value) => value.personalValue);
  // const chartData = {
  //   datasets: [
  //     {
  //       label: 'Your Values',
  //       data: data,
  //       elements: {
  //         line: {
  //           backgroundColor: COLORS.ACCENT2,
  //         },
  //       },
  //     },
  //   ],
  //   labels,
  // };

  const data = {
    labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: scores,
        fill: true,
        backgroundColor: 'rgba(107, 99, 255, 0.865)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  // const chartOptions = {
  //   scales: {
  //     r: {
  //       angleLines: {
  //         display: false,
  //       },
  //       suggestedMin: 50,
  //       suggestedMax: 100,
  //     },
  //   },
  // };

  // const chartOptions = {
  //   scale: {
  //     r: {
  //       stepSize: 1,
  //     },
  //   },
  // maintainAspectRatio: false,
  // responsive: true,
  // legend: {
  //   display: true,
  //   position: 'bottom',
  //   labels: {
  //     fontColor: COLORS.DK_TEXT,
  //     fontFamily: 'Bilo',
  //   },
  // },
  // tooltips: {
  //   callbacks: {
  //     title: (e: any) => {
  //       const event = e[0];
  //       const valueName = labels[event.index];
  //       return valueName.toLocaleUpperCase();
  //     },
  //   },
  // },
  // scales: {
  //   r: {
  //     gridLines: {
  //       color: COLORS.PRIMARY,
  //       lineWidth: 2,
  //     },
  //     angleLines: {
  //       color: COLORS.PRIMARY,
  //       lineWidth: 2,
  //     },
  //     ticks: {
  //       beginAtZero: true,
  //       showLabelBackdrop: false,
  //       labels: {
  //         fontColor: COLORS.DK_TEXT,
  //         fontFamily: 'Bilo',
  //       },
  //     },
  //     pointLabels: {
  //       fontColor: COLORS.DK_TEXT,
  //       fontSize: 13,
  //       fontFamily: 'Bilo',
  //       // display: !isXS,
  //     },
  //   },
  //   elements: {
  //     point: {
  //       radius: 4,
  //       pointStyle: 'circle',
  //       borderWidth: 2,
  //       borderColor: '#FFFFFF',
  //       hoverRadius: 10,
  //       hitRadius: 10,
  //       backgroundColor: '#078DFF',
  //       hoverBorderWidth: 5,
  //     },
  //     line: {
  //       backgroundColor: '#078DFF80',
  //       borderColor: '#078DFF',
  //     },
  //   },
  // },
  // };

  // const chartOptions = {
  //   elements: {
  //     line: {
  //       borderWidth: 3,
  //     },
  //   },
  // };

  return (
    <Box my={2} mb={4}>
      <PageTitle variant="h2">Your Personal Value Web</PageTitle>

      {data && labels && data && <Radar data={data} />}
    </Box>
  );
}
