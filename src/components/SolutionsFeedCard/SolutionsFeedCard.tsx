import React from 'react';

import Card from 'components/Card/Card';
import CardHeader from 'components/CardHeader';
import SolutionOverlay from 'components/SolutionOverlay';
import { TSolution } from 'types/Solutions';
import CmTypography from 'shared/components/CmTypography';

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
      <CmTypography variant="body">{solution.shortDescription}</CmTypography>
    </Card>
  );
};
