import React from 'react';
import { Typography } from '@material-ui/core';

import Card from 'components/Card/Card';
import CardHeader from 'components/CardHeader';
import SolutionOverlay from 'components/SolutionOverlay';
import { TSolution } from 'types/Solutions';

type SolutionsFeedCardProps = {
  index: number;
  solution: TSolution;
};

export const SolutionsFeedCard = ({
  index,
  solution,
}: SolutionsFeedCardProps) => {
  return (
    <Card
      index={index}
      imageUrl={solution.imageUrl}
      header={
        <CardHeader
          title={solution.solutionTitle}
          preTitle={`${solution.solutionType} action`}
        />
      }
      footer={<SolutionOverlay solution={solution} />}
    >
      <Typography variant="body1">{solution.shortDescription}</Typography>
    </Card>
  );
};
