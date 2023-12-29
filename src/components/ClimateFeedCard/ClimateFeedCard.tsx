import React from 'react';
import { Box } from '@material-ui/core';

import { COLORS } from 'common/styles/CMTheme';
import Card from 'components/Card/Card';
import CardHeader from 'components/CardHeader';
import EffectOverlay from 'components/EffectOverlay';
import { TClimateEffect } from 'types/types';
import { Pil } from 'components/Pil';
import CmTypography from 'shared/components/CmTypography';

type ClimateFeedCardProps = {
  index: number;
  effect: TClimateEffect;
};

export const ClimateFeedCard = ({ index, effect }: ClimateFeedCardProps) => {
  return (
    <Card
      index={index}
      imageUrl={effect.imageUrl}
      preview={
        <CardHeader
          title={effect.effectSolutions[0].solutionTitle}
          preTitle={`${effect.effectSolutions[0].solutionType} Action`}
          bgColor={COLORS.ACCENT2}
          index={index}
          cardIcon={effect.effectSolutions[0].solutionType}
        />
      }
      header={
        <CardHeader
          title={effect.effectTitle}
          preTitle={effect?.isPossiblyLocal ? 'Local impact' : ''}
          isPossiblyLocal={effect.isPossiblyLocal}
        />
      }
      footer={<EffectOverlay effect={effect} />}
    >
      <CmTypography variant="body">{effect.effectShortDescription}</CmTypography>

      <Box mt={2}>
      {effect.relatedPersonalValues?.map(
        (relPersonalVal, ind) => (
          <Pil text={relPersonalVal} key={ind}></Pil>
        )
      )}
      </Box>
    </Card>
  );
};
